'use strict'
const { QueryTypes, Op, where } = require('sequelize')
const { Idea, Comment, User, Category, sequelize } = require('../index')
const { createVote, deleteVote, findVote } = require('./vote.repo')
const { processReturnedData } = require('../../utils')

// DEFIND OPTIONS
const optIdea = {
    include: [{
        model: Comment,
        as: 'comments',
        include: [
            {
                model: User,
                attributes: ['username', 'email']
            }
        ]
        }, {
            model: Category,
            attributes: ['title', 'icon']
        }, 
        {
            model: User,
            attributes: ['username', 'email']
        },
    ],
    attributes: ['id', 'title', 'content', 'voteCount', 'commentCount', 'createdAt', 'updatedAt']
}


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
const findIdea = async ({ id }) => {    
    const idea = await Idea.findByPk(id, optIdea)
    return processReturnedData(idea)
}

const findAllIdeas = async () => {
    const ideas = await Idea.findAll()
    return processReturnedData(ideas)
}

const findAllIdeasByUsedId = async ({userId, isPublished = true}) => {
    const ideas = await Idea.findAll({
        where: {
            userId,
            // isPublished
        },
        ...optIdea
    })
    return processReturnedData(ideas)
}

const findIdeaPage = async ({ limit, page }) => {
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
                attributes: ['title', 'icon']
            }
        ],
        where: {
            isPublished: true
        },
        attributes: {
            exclude: ['isPublished']
        }
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