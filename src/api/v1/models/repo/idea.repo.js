'use strict'
const { Idea, Comment, sequelize } = require('../index')
const { createVote } = require('./vote.repo')

const createIdea = async ({
    title, content, categoryId, userId
}) => {
    const idea = await Idea.create({
        title,
        content,
        userId,
        categoryId
    })

    return idea
}

// FIND
const findIdea = async (id) => {
    const idea = await Idea.findOne(id)
    return idea
}

const findAllIdeas = async () => {
    const ideas = await Idea.findAll()
    return ideas
}

const findAllIdeasByUsedId = async (userId) => {
    return await Idea.findAll({
        where: {
            userId
        },
        include: [{
            model: Comment,
            as: 'comments'
        }]
    })
}

const findIdeaPage = async ({ limit, start, options }) => {
    const offset = start * limit
    
    const { count, rows: ideas } = await Idea.findAndCountAll({
        offset,
        limit,
        ...options
    })

    const totalPages = Math.ceil(count / limit)

    return {
        ideas,
        totalPages
    }
}

const increaseVoteCount = async ({
    ideaId, userId
}) => {
    const idea = await Idea.findByPk(ideaId)
    await sequelize.transaction(async () => {
        const { vote, isCreated } = await createVote({
            userId, ideaId
        })
        if(isCreated) {
            await idea.increment('voteCount', {
                by: 1
            })
        }
    })
    return idea
}


const decrementVoteCount = async (ideaId) => {
    const idea = await findIdea(ideaId)
    idea.decrement('voteCount', {
        by: 1
    })

    return idea
}



module.exports = {
    createIdea,
    findAllIdeas,
    findAllIdeasByUsedId,
    findIdeaPage,
    findIdea,
    increaseVoteCount,
    decrementVoteCount
}