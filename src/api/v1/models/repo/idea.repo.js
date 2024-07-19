'use strict'
const { Op } = require('sequelize')
const { Idea, Comment, User, Category, sequelize } = require('../index')
const { upVote, downVote, deleteVote } = require('./vote.repo')
const { processReturnedData } = require('../../utils')

// DEFIND OPTIONS
const optIdea = {
    order: [
        ['createdAt', 'DESC'],
        ['id', 'DESC']
    ],
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
    // attributes: ['id', 'title', 'content', 'voteCount', 'commentCount', 'viewCount', 'createdAt', 'updatedAt']
    attributes: {
        exclude: ['isPublished', 'categoryId', 'userId']
    }
}

const optIdeaNoComment = {
    order: [
        ['createdAt', 'DESC'],
        ['id', 'DESC']
    ],
    include: [
        {
            model: User,
            attributes: ['id', 'username', 'email']
        },
        {
            model: Category,
            attributes: ['title', 'icon']
        }
    ],
    attributes: {
        exclude: ['isPublished', 'categoryId', 'userId']
    }
}

const createIdea = async ({
    title, content, categoryId, userId, isPublished
}) => {
    const idea = await Idea.create({
        title,
        content,
        userId,
        categoryId,
        isPublished
    })

    return idea
}

// FIND
const findIdea = async ({ id }) => {    
    const idea = await Idea.findOne({
        where: {
            id,
            isPublished: true
        },
        ...optIdea
    })
    return idea && processReturnedData(idea)
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

const findIdeaPage = async ({ limit, page, q = null }) => {
    const offset = (page - 1) * limit
    const search = q ? {
        title: {
            [Op.like]: `%${q}%`
        }
    } : null

    const { count, rows: ideas } = await Idea.findAndCountAll({
        offset,
        limit,
        where: {
            isPublished: true,
            ...search
        },
        ...optIdeaNoComment
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
    const t = await sequelize.transaction()

    const point = await upVote({
        ideaId, userId
    })
    await idea.increment('voteCount', {
        by: point
    })
    await t.commit()
    return {
        voteCount: idea.voteCount
    }
}

const decrementVoteCount = async ({
    ideaId, userId
}) => {
    const idea = await Idea.findByPk(ideaId)
    const t = await sequelize.transaction()

    const point = await downVote({
        userId, ideaId 
    })
    await idea.decrement('voteCount', {
        by: point
    })
    await t.commit()
    return {
        voteCount: idea.voteCount
    }
}

const cancelVote = async ({
    ideaId, userId
}) => {
    const idea = await Idea.findByPk(ideaId)
    const t = await sequelize.transaction()
    const point = await deleteVote({
        userId, ideaId 
    })
    await idea.increment('voteCount', {
        by: point
    })
    await t.commit()
    return {
        voteCount: idea.voteCount
    }
}

const upView = async (id) => {
    const idea = await Idea.increment({
        viewCount: 1
    }, 
    { 
        where: { id },
        raw: true
    })

    return idea.viewCount
}

const updateIdea = async ({ id, opt}) => {
    const idea = await Idea.findByPk(id)

    await idea.update(opt)
    await idea.save()

    return processReturnedData(idea)
}

module.exports = {
    createIdea,
    findAllIdeas,
    findAllIdeasByUsedId,
    findIdeaPage,
    findIdea,
    increaseVoteCount,
    decrementVoteCount,
    cancelVote,
    updateIdea,
    upView
}