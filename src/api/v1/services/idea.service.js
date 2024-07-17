'use strict'

const { BadRequest } = require("../core/error.response")
const { createIdea, findAllIdeas, findAllIdeasByUsedId, findIdeaPage, findIdea, increaseVoteCount, searchIdea, decrementVoteCount } = require("../models/repo/idea.repo")
const { insertDataByES, searchDataByES } = require('../elastic/idea.elastic')
const { findVote } = require('../models/repo/vote.repo')
const { getModel } = require("../utils")

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

    static getIdea = async (id) => {

        const ideas = await findIdea({id})

        return ideas
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
        const {ideas, totalPages} = await searchIdea({
            q, page, limit
        })
        return {
            metadata: {
                currentPage: page,
                totalPages,
                limit
            },
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
}

module.exports = IdeaService