'use strict'

const { BadRequest, Forbidden } = require("../core/error.response")
const { 
    createIdea, findAllIdeasByUsedId, findIdeaPage, findIdea, increaseVoteCount, decrementVoteCount, updateIdea, cancelVote,
    upView,
    findDraftIdea,
    findPublisedIdea,
    findIdeasByIds,
    findIdeasByCategoryId,
    findIdeasByVote,
    findUserIdByIdeaId,
    findAllIdeas,
    deleteIdea,
    findAllOwnIdeas,
} = require("../models/repo/idea.repo")
const { sortComment, removeField } = require("../utils")
const VoteService = require("./vote.service")
const RedisService = require("./redis.service")
const { OPTION_SHOW_IDEA } = require("../constants")
const ElasticSearch = require("./es.service")
const MessageQueue = require('./rabbitmq.service')
const CommentService = require("./comment.service")

class IdeaService {
    static createIdea = async ({
        title, content, categoryId, userId, isPublished = false
    }) => {
        if(!content || !title || !categoryId) throw new BadRequest('Title, content and category are required')

        const savedIdea = await createIdea({
            title, content, categoryId, userId, isPublished
        })
        // Ingest elastic
        await ElasticSearch.createDocument({
            // Using dynamic index getting from db
            index: 'ideas',
            body: savedIdea.dataValues
        })

        return 1
    }

    static getIdea = async ({ id, userId, isPublished }) => {
        await upView(id)
        const idea = await findIdea({id, isPublished})
        if(!idea) throw new BadRequest('Idea is not exist')
        const handledComment = sortComment(idea.comments)
        
        let status = await VoteService.getStatusVote({
            ideaId: idea.id,
            userId
        })
        idea.vote = status

        const handledIdea = {
            ...idea,
            comments: handledComment
        }
        await RedisService.ZADD({
            key: `currentIdeas:${userId}`,
            value: `${idea.id}`,
            score: Date.now()
        })
        return handledIdea
    }

    static getAllIdeas = async ({
        limit = 5, page = 1, userId, option = Object.keys(OPTION_SHOW_IDEA)[0], isPublished = null
    }) => {
        let fieldSort = OPTION_SHOW_IDEA[option]
        let {
            ideas, totalIdea
        } = await findAllIdeas({ limit, page, fieldSort, isPublished })

        for(let i = 0; i < ideas.length; i++) {
            let status = await VoteService.getStatusVote({
                ideaId: ideas[i].id,
                userId
            })
            ideas[i].vote = status
        }

        const totalPage = Math.ceil(totalIdea / limit)

        return {
            totalPage: totalPage,
            currentPage: page,
            pageSize: limit,
            total: totalIdea,
            ideas,
        }
    }

    static getAllPublisedIdeas = async ({
        limit = 5, page = 1, userId, option = Object.keys(OPTION_SHOW_IDEA)[0], duration
    }) => {
        return await this.getAllIdeas({
            limit, page, userId, option, isPublished: true, duration
        })
    }

    static getAllDraftIdeas = async ({
        limit = 5, page = 1, userId, option = Object.keys(OPTION_SHOW_IDEA)[0]
    }) => {
        return await this.getAllIdeas({
            limit, page, userId, option, isPublished: false 
        })
    }

    static getRecentIdeas = async (userId) => {
        const key = `currentIdeas:${userId}`
        const recentIdeas = await RedisService.ZRANGE({
            key
        })
        const ideas = await findIdeasByIds(recentIdeas)
        return ideas
    }

    static getSimilarIdeas = async ({
        ideaId,
        limit = 3
    }) => {
        const idea = await findIdea({ id: ideaId })
        const categoryId = idea?.Category.id
        if(!categoryId) throw new BadRequest('Not found category')
        const ideas = await findIdeasByCategoryId({
            categoryId,
            limit,
            ideaId
        })
        return ideas
    }

    static getPopularIdeas = async ({
        limit = 3
    }) => {
        const ideas = await findIdeasByVote({
            limit
        })
        return ideas
    }

    static searchIdea = async ({q, limit = 5, page = 1, userId, duration }) => {
        try {
            const resp = await ElasticSearch.searchDocument({
                // Using dynamic
                index: 'ideas',
                queryString: q,
                duration
            })
            let totalPage = 1
            const ideaIds = resp.map(i => i._source.id)
            console.log(ideaIds);
            let totalIdea = ideaIds.length > 5 ? 5 :  ideaIds.length
            
            let ideas = await findIdeasByIds(ideaIds)

            return {
                totalPage: totalPage,
                currentPage: page,
                pageSize: limit,
                total: totalIdea,
                ideas,
            }
        } catch (error) {
            console.log(`Search Elastic Error:`, error)
            throw new BadRequest(error.message)
        }
        
        // const {ideas, totalIdea} = await findIdeaPage({
        //     q, page, limit, fieldSort: 'createdAt'
        // })
        // for(let i = 0; i < ideas.length; i++) {
        //     let status = await VoteService.getStatusVote({
        //         ideaId: ideas[i].id,
        //         userId
        //     })
        //     ideas[i].vote = status
        // }
        // const totalPage = Math.ceil(totalIdea / limit)
        // return {
        //     totalPage: totalPage,
        //     currentPage: page,
        //     pageSize: limit,
        //     total: totalIdea,
        //     ideas,
        // }
    }

    static upVoteCount = async({
        ideaId, userId
    }) => {

        // 1. Up vote
        let {
            voteCount,
            updated
        } = await increaseVoteCount({
            ideaId,
            userId
        })
        // 2. Send notification
        if(updated) {
            const receiver = await findUserIdByIdeaId({ id: ideaId })
            const data = {
                sender: userId,
                receiver: receiver.toString(),
                target: 'idea',
                action: 'up',
                metadata: {
                    targetId: ideaId
                }
            }
            await MessageQueue.send({
                nameExchange: 'post_notification',
                message: data
            })
            console.log(`Send msg`);
        }

        return {
            voteCount
        }
    }

    static downVoteCount = async({
        ideaId, userId
    }) => {
        return await decrementVoteCount({
            ideaId,
            userId
        })
    }

    static cancelVote = async({
        ideaId, userId
    }) => {
        return await cancelVote({
            ideaId,
            userId
        })
    }

    static publishIdea = async ({
        ideaId
    }) => {
        const idea = await findDraftIdea({ id: ideaId })
        if(!idea) throw new BadRequest('Not found idea')
        const updatedIdea = await updateIdea({
            id: ideaId,
            opt: {
                isPublished: true
            }
        })

        return updatedIdea ? 1 : 0
    }

    static unPublishIdea = async ({
        ideaId
    }) => {
        const idea = await findPublisedIdea({ id: ideaId })
        if(!idea) throw new BadRequest('Not found idea')
        const updatedIdea = await updateIdea({
            id: ideaId,
            opt: {
                isPublished: false
            }
        })

        return updatedIdea ? 1 : 0
    }

    static updateIdea = async ({
        ideaId, payload
    }) => {
        let userId = payload.userId
        let prePayload = {
            title: payload.title,
            content: payload.content
        }
        prePayload = removeField({
            obj: prePayload
        })
        // let ideaHolder = await findIdea({ id: ideaId, isPublished: null })
        let ideaHolder = await this.getIdea({ id: ideaId, userId, isPublished: null })
        if(ideaHolder.userId != userId) throw new BadRequest('[o] You don\'t have permission to execute action')
        let updatedIdea = await updateIdea({
            id: ideaId,
            opt: {
                ...prePayload
            }
        })
        if(ideaHolder.isPublished) {
            this.unPublishIdea({ ideaId })
        }
        return updatedIdea ? 1 : 0
    }

    static deleteIdea = async ({
        ideaId, userId
    }) => {
        let ideaHolder = await this.getIdea({ id: ideaId, userId, isPublished: null })
        if(ideaHolder.userId != userId) throw new BadRequest('You don\'t have permission to access resource')

        let deleted = await Promise.all([
            await deleteIdea(ideaId),
            await CommentService.deleteCommentByIdeaId(ideaId)
        ])
        return deleted[0] && deleted[1] ? 1 : 0
    }

    // FOR OWN USER
    static getAllOwnIdeas = async ({
        limit = 5, page = 1, userId
    }) => {
        let {
            ideas, totalIdea
        } = await findAllOwnIdeas({ limit, page, userId })

        for(let i = 0; i < ideas.length; i++) {
            let status = await VoteService.getStatusVote({
                ideaId: ideas[i].id,
                userId
            })
            ideas[i].vote = status
        }

        const totalPage = Math.ceil(totalIdea / limit)

        return {
            totalPage: totalPage,
            currentPage: page,
            pageSize: limit,
            total: totalIdea,
            ideas,
        }
    }
}

module.exports = IdeaService