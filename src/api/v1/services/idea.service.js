'use strict'

const { BadRequest } = require("../core/error.response")
const { 
    createIdea, findAllIdeasByUsedId, findIdeaPage, findIdea, increaseVoteCount, decrementVoteCount, updateIdea, cancelVote,
    upView
} = require("../models/repo/idea.repo")
const { insertDataByES, searchDataByES } = require('../elastic/idea.elastic')

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

    static getIdea = async (id) => {
        await upView(id)
        const idea = await findIdea({id})
        // const idea = 
        return idea
    }

    static getAllIdeas = async ({
        limit = 5, page = 1
    }) => {
        const {
            ideas, totalIdea
        } = await findIdeaPage({ limit, page })

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
        return ideas
    }

    static searchIdea = async ({q, limit = 5, page = 1}) => {
        const {ideas, totalIdea} = await findIdeaPage({
            q, page, limit
        })

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

    static publishIdea = async (ideaId) => {
        const updatedIdea = await updateIdea({
            id: ideaId,
            opt: {
                isPublished: true
            }
        })

        return updatedIdea ? 1 : 0
    }

    static unPublishIdea = async (ideaId) => {
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