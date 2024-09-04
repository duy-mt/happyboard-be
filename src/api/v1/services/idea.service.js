'use strict'

const { BadRequest, Forbidden } = require("../core/error.response")
const { 
    createIdea, findAllIdeasByUsedId, findIdeaPage, findIdea, increaseVoteCount, decrementVoteCount, updateIdea, cancelVote,
    upView,
    findPendingIdea,
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
const HistoryService = require("./history.service")

class IdeaService {
    static createIdea = async ({
        title, content, categoryId, userId, isPublished = false, isDrafted = false
    }) => {
        if(!content || !title || !categoryId) throw new BadRequest('Title, content and category are required')

        const savedIdea = await createIdea({
            title, content, categoryId, userId, isPublished, isDrafted
        })
        await HistoryService.createHistory({
            type: 'CI01',
            userId,
            userTargetId: userId,
            objectTargetId: savedIdea.id,
            contentIdea: savedIdea.title
        })

        return 1
    }

    static draftIdea = async ({
        title, content, categoryId, userId, isPublished = false, isDrafted = true
    }) => {
        if(!content || !title || !categoryId) throw new BadRequest('Title, content and category are required')

        const savedIdea = await createIdea({
            title, content, categoryId, userId, isPublished, isDrafted
        })
        // Ingest elastic
        // await ElasticSearch.createDocument({
        //     // Using dynamic index getting from db
        //     index: 'ideas',
        //     body: savedIdea.dataValues
        // })

        return 1
    }

    static getIdea = async ({ id, userId, isPublished = true, isDrafted = false }) => {
        const idea = await findIdea({ id, isPublished, isDrafted })
        if(!idea) throw new BadRequest('Idea is not exist')
        await upView(id)
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
        let key = `user:${userId}:currentIdeas`
        await RedisService.ZADD({
            key,
            value: `${idea.id}`,
            score: Date.now()
        })
        return handledIdea
    }

    static getOwnDraftedIdea = async ({ id, userId}) => {
        const idea = await findIdea({id, isPublished: false, isDrafted: true})
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
        // await RedisService.ZADD({
        //     key: `currentIdeas:${userId}`,
        //     value: `${idea.id}`,
        //     score: Date.now()
        // })
        return handledIdea
    }

    static getOwnHidedIdea = async ({ id, userId}) => {
        const idea = await findIdea({id, isPublished: false, isDrafted: false})
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
        // await RedisService.ZADD({
        //     key: `currentIdeas:${userId}`,
        //     value: `${idea.id}`,
        //     score: Date.now()
        // })
        return handledIdea
    }

    static getAllIdeas = async ({
        limit = 5, page = 1, userId, option = Object.keys(OPTION_SHOW_IDEA)[0], isPublished = null, isDrafted = false
    }) => {
        let fieldSort = OPTION_SHOW_IDEA[option]
        let {
            ideas, totalIdea
        } = await findAllIdeas({ limit, page, fieldSort, isPublished, isDrafted })

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
        limit = 10, page = 1, userId, option = Object.keys(OPTION_SHOW_IDEA)[0], duration
    }) => {
        return await this.getAllIdeas({
            limit, page, userId, option, isPublished: true, duration
        })
    }

    static getAllPengindIdeas = async ({
        limit = 10, page = 1, userId, option = Object.keys(OPTION_SHOW_IDEA)[0], duration
    }) => {
        return await this.getAllIdeas({
            limit, page, userId, option, isPublished: false, isDrafted: false, duration
        })
    }

    static getRecentIdeas = async (userId) => {
        let key = `user:${userId}:currentIdeas`
        const recentIdeas = await RedisService.ZRANGE({
            key
        })
        const ideas = await findIdeasByIds(recentIdeas)
        return ideas
    }

    static getSimilarIdeas = async ({
        ideaId,
        limit = 5
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
        limit = 5
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

            ideas.forEach(idea => {
                let id = idea.id
                let highlight = resp.find(e => e._source.id === id).highlight
                idea.highlight = highlight
            })

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

        // 0. find idea
        const idea = await findIdea({id: ideaId})
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

            await HistoryService.createHistory({
                type: 'VI01',
                userId,
                userTargetId: receiver,
                objectTargetId: ideaId,
                contentIdea: idea.title
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

        const idea = await findIdea({id: ideaId})
        const receiver = await findUserIdByIdeaId({ id: ideaId })
        await HistoryService.createHistory({
            type: 'VI01',
            userId,
            userTargetId: receiver,
            objectTargetId: ideaId,
            contentIdea: idea.title
        })
        return await decrementVoteCount({
            ideaId,
            userId
        })
    }

    static cancelVote = async ({
        ideaId, userId
    }) => {
        const idea = await findIdea({id: ideaId})
        const receiver = await findUserIdByIdeaId({ id: ideaId })
        await HistoryService.createHistory({
            type: 'VI01',
            userId,
            userTargetId: receiver,
            objectTargetId: ideaId,
            contentIdea: idea.title
        })
        return await cancelVote({
            ideaId,
            userId
        })
    }

    static publishIdea = async ({
        ideaId, adminId
    }) => {
        const idea = await findPendingIdea({ id: ideaId })
        if(!idea) throw new BadRequest('Not found idea')
        const updatedIdea = await updateIdea({
            id: ideaId,
            opt: {
                isPublished: true
            }
        })

        // Ingest elastic
        let body = {
            id: idea.id,
            title: idea.title,
            content: idea.content,
            createdAt: idea.createdAt,
            updatedAt: idea.updatedAt
        }
        await ElasticSearch.createDocument({
            // Using dynamic index getting from db
            index: 'ideas',
            body
        })

        const data = {
            sender: adminId,
            receiver: idea.userId.toString(),
            target: 'idea',
            action: 'release',
            metadata: {
                targetId: ideaId
            }
        }
        await MessageQueue.send({
            nameExchange: 'post_notification',
            message: data
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
        if(!updatedIdea) throw new BadRequest('Unpublish idea failed') 
        await ElasticSearch.deleteDocument({
            index: 'ideas',
            id: ideaId
        })
        return updatedIdea ? 1 : 0
    }

    static updateIdea = async ({
        ideaId, payload
    }) => {
        let userId = payload.userId
        let prePayload = {
            title: payload.title,
            content: payload.content,
            isDrafted: payload.isDrafted,
            isPublished: payload.isPublished
        }
        prePayload = removeField({
            obj: prePayload
        })
        // let ideaHolder = await findIdea({ id: ideaId, isPublished: null })
        let ideaHolder = await this.getIdea({ id: ideaId, userId, isPublished: null, isDrafted: null })
        if(ideaHolder.userId != userId) throw new BadRequest('[o] You don\'t have permission to execute action')
        let updatedIdea = await updateIdea({
            id: ideaId,
            opt: {
                ...prePayload
            }
        })

        if(updatedIdea.isPublished) {
            await this.unPublishIdea({ ideaId })
        }

        await HistoryService.createHistory({
            type: 'EI01',
            userId,
            userTargetId: userId,
            objectTargetId: ideaId,
            contentIdea: ideaHolder.title
        })

        return updatedIdea ? 1 : 0
    }

    static deleteIdea = async ({
        ideaId, userId
    }) => {
        // let ideaHolder = await this.getIdea({ id: ideaId, userId, isPublished: null })
        let ideaHolder = await findIdea({ id: ideaId })
        if(ideaHolder.userId != userId) throw new BadRequest('You don\'t have permission to access resource')

        let deleted = await Promise.all([
            await deleteIdea(ideaId),
            await CommentService.deleteCommentByIdeaId(ideaId)
        ])
        if(deleted[0] && deleted[1]) {
            await HistoryService.createHistory({
                type: 'DI01',
                userId,
                userTargetId: userId,
                objectTargetId: ideaId,
                contentIdea: ideaHolder.title
            })
            await ElasticSearch.deleteDocument({
                index: 'ideas',
                id: ideaId
            })
            return 1
        }
        return 0
    }

    // FOR OWN USER
    static getAllOwnIdeas = async ({
        limit = 10, page = 1, userId, isPublished = null, isDrafted = null
    }) => {
        let {
            ideas, totalIdea
        } = await findAllOwnIdeas({ limit, page, userId, isPublished, isDrafted })

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

    static getAllOwnPublishedIdeas = async ({
        limit = 5, page = 1, userId,
    }) => {
        return await this.getAllOwnIdeas({ limit, page, userId, isPublished: true })
    }

    static getAllOwnHidedIdeas = async ({
        limit = 10, page = 1, userId,
    }) => {
        return await this.getAllOwnIdeas({ limit, page, userId, isPublished: false, isDrafted: false })
    }

    static getAllOwnDraftedIdeas = async ({
        limit = 10, page = 1, userId,
    }) => {
        return await this.getAllOwnIdeas({ limit, page, userId, isPublished: false, isDrafted: true })
    }
}

module.exports = IdeaService