'use strict'
const { Op,literal, where } = require('sequelize')
const { Idea, Comment, User, Category, Vote, sequelize } = require('../index')
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
            attributes: ['id', 'title', 'icon'],
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
            attributes: ['id', 'title', 'icon']
        }
    ],
    attributes: {
        exclude: ['isPublished', 'categoryId', 'userId'],
        
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

const findDraftIdea = async ({ id }) => {
    const idea = await Idea.findOne({
        where: {
            id,
        },
        raw: true
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

const findIdeasByIds = async (ids = []) => {
    let ideas = Promise.all(await ids.map(async (id) => {
        let i = await Idea.findOne({
            where: {
                id
            },
            ...optIdeaNoComment,
        })
        return processReturnedData(i)
    }))
    
    return ideas
}

const findIdeasByCategoryId = async ({categoryId, limit}) => {
    const ideas = await Idea.findAll({
        limit,
        where: {
            categoryId,
            isPublished: true
        },
        ...optIdeaNoComment
    })
    return processReturnedData(ideas)
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
    upView,
    findDraftIdea,
    findIdeasByIds,
    findIdeasByCategoryId
}