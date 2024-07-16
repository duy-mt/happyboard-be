'use strict'
const { QueryTypes, Op } = require('sequelize')
const { Idea, Comment, User, Category, sequelize } = require('../index')
const { createVote, deleteVote, findVote } = require('./vote.repo')
const { processReturnedData } = require('../../utils')

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
const findIdea = async ({ id, options = {} }) => {    
    const idea = await Idea.findByPk(id, options)
    return processReturnedData(idea)
}

const findAllIdeas = async () => {
    const ideas = await Idea.findAll()
    return processReturnedData(ideas)
}

const findAllIdeasByUsedId = async (userId) => {
    const ideas = await Idea.findAll({
        where: {
            userId
        },
        include: [{
            model: Comment,
            as: 'comments'
        }]
    })
    return processReturnedData(ideas)
}

const findIdeaPage = async ({ limit, page, options }) => {
    const offset = (page - 1) * limit

    const { count, rows: ideas } = await Idea.findAndCountAll({
        offset,
        limit,
        order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Category,
                attributes: ['title']
            }
        ]
    })
    
    return {
        ideas: processReturnedData(ideas),
        totalIdea: count
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
    return {
        voteCount: idea.voteCount
    }
}


const decrementVoteCount = async ({ userId, ideaId }) => {
    const [idea, vote] = await Promise.all([
        Idea.findByPk(ideaId),
        findVote({ userId, ideaId })
    ])
    
    if(vote) {
        await sequelize.transaction(async (t) => {
            await deleteVote({userId, ideaId})
    
            if (idea.voteCount > 0) {
                await idea.decrement('voteCount', {
                    by: 1,
                    transaction: t
                })
            }
        })
    }

    return {
        voteCount: idea.voteCount
    }
}

const searchIdea = async ({q, page = 1, limit = 5}) => {    
    const offset = (page - 1) * limit;

    const { count, rows } = await Idea.findAndCountAll({
        offset,
        limit,
        order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC']
        ],
        where: {
            title: {
                [Op.like]: `%${q}%`
            }
        }
    })

    const totalPages = Math.ceil(count / limit);
    return {
        ideas: processReturnedData(rows),
        totalPages
    };
}



module.exports = {
    createIdea,
    findAllIdeas,
    findAllIdeasByUsedId,
    findIdeaPage,
    findIdea,
    increaseVoteCount,
    decrementVoteCount,
    searchIdea
}