'use strict'

const { BadRequest } = require("../core/error.response")
const { createIdea, findAllIdeas, findAllIdeasByUsedId, findIdeaPage, findIdea, increaseVoteCount } = require("../models/repo/idea.repo")
const { insertDataByES, searchDataByES } = require('../elastic/idea.elastic')

class IdeaService {
    static createIdea = async ({
        title, content, categoryId, userId
    }) => {
        if(!content || !title) throw new BadRequest('Title and content are required')
        categoryId = categoryId ? categoryId : 0

        const idea = await createIdea({
            title, content, categoryId, userId
        })

        // Ingest elastic
        await insertDataByES({
            obj: idea
        })

        return idea
    }

    static getIdea = async () => {
        const idea = await findIdea()
        return idea
    }

    static getAllIdeas = async ({
        limit = 5, start = 0
    }) => {
        const { ideas, totalPages } = await findIdeaPage({
            limit, start
        })

        return {
            ideas,
            totalPages
        }
    }

    static getAllIdeasByUserId = async (userId) => {
        const ideas = await findAllIdeasByUsedId(userId) 
        return ideas
    }

    static searchIdea = async ({q, limit = 5, page = 0}) => {
        const start = page * limit
        return await searchDataByES({
            keyword: q,
            limit,
            start
        })
    }

    static upVoteCount = async({
        ideaId, userId
    }) => {
        return await increaseVoteCount({
            ideaId,
            userId
        })
    }
}

module.exports = IdeaService