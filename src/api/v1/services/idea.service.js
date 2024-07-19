'use strict'

const { BadRequest, Forbidden } = require("../core/error.response")
const { 
    createIdea, findAllIdeasByUsedId, findIdeaPage, findIdea, increaseVoteCount, decrementVoteCount, updateIdea, cancelVote,
    upView,
    findDraftIdea,
    findIdeasByIds,
    findIdeasByCategoryId,
    findIdeasByVote
} = require("../models/repo/idea.repo")
const { insertDataByES, searchDataByES } = require('../elastic/idea.elastic')
const { sortComment } = require("../utils")
const VoteService = require("./vote.service")
const RedisService = require("./redis.service")

class IdeaService {
    static createIdea = async ({
        title, content, categoryId, userId, isPublished = true
    }) => {
        if(!content || !title) throw new BadRequest('Title and content are required')
        categoryId = categoryId ? categoryId : 0

        const savedIdea = await createIdea({
            title, content, categoryId, userId, isPublished
        })
        const idea = await findIdea({id: savedIdea.id})
        // Ingest elastic
        await insertDataByES({
            obj: savedIdea
        })

        return idea
    }

    static getIdea = async ({ id, userId }) => {
        await upView(id)
        const idea = await findIdea({id})
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
        await RedisService.LSET({
            key: `currentIdeas:${userId}`,
            value: `${idea.id}`
        })
        return handledIdea
    }

    static getAllIdeas = async ({
        limit = 5, page = 1, userId
    }) => {
        let {
            ideas, totalIdea
        } = await findIdeaPage({ limit, page })

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

    static getAllPublisedIdeas = async (userId) => {
        const ideas = await findAllIdeasByUsedId({userId}) 
        for(let i = 0; i < ideas.length; i++) {
            let status = await VoteService.getStatusVote({
                ideaId: ideas[i].id,
                userId
            })
            ideas[i].vote = status
        }
        return ideas
    }

    static getRecentIdeas = async (userId) => {
        const key = `currentIdeas:${userId}`
        const recentIdeas = await RedisService.LRANGE({
            key,
            start: 0,
            stop: 3
        })

        const ideas = await findIdeasByIds(recentIdeas)
        for(let i = 0; i < ideas.length; i++) {
            let status = await VoteService.getStatusVote({
                ideaId: ideas[i].id,
                userId
            })
            ideas[i].vote = status
        }
        return ideas
    }

    static getSimilarIdeas = async ({
        ideaId,
        limit = 3
    }) => {
        const idea = await findIdea({ id: ideaId })
        const categoryId = idea.Category.dataValues.id

        const ideas = await findIdeasByCategoryId({
            categoryId,
            limit
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

    static searchIdea = async ({q, limit = 5, page = 1, userId}) => {
        const {ideas, totalIdea} = await findIdeaPage({
            q, page, limit
        })
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

    static upVoteCount = async({
        ideaId, userId
    }) => {
        return await increaseVoteCount({
            ideaId,
            userId
        })
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
        ideaId, userId
    }) => {
        const idea = await findDraftIdea({ id: ideaId })
        if(idea.userId != userId) throw new Forbidden('You do not have permission to access this resource')

        const updatedIdea = await updateIdea({
            id: ideaId,
            opt: {
                isPublished: true
            }
        })

        return updatedIdea ? 1 : 0
    }

    static unPublishIdea = async ({
        ideaId, userId
    }) => {
        const idea = await findDraftIdea({ id: ideaId })
        if(idea.userId != userId) throw new Forbidden('You do not have permission to access this resource')
        const updatedIdea = await updateIdea({
            id: ideaId,
            opt: {
                isPublished: false
            }
        })

        return updatedIdea ? 1 : 0
    }
}

module.exports = IdeaService