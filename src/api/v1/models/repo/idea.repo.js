'use strict'
const { Op,literal, where } = require('sequelize')
const { Idea, Comment, User, Category, Vote, sequelize } = require('../index')
const { upVote, downVote, deleteVote, findVote } = require('./vote.repo')
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
        exclude: ['categoryId']
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
        exclude: ['isDrafted', 'isPublished', 'categoryId', 'userId'],
    }
}

const createIdea = async ({
    title, content, categoryId, userId, isPublished, isDrafted
}) => {
    const idea = await Idea.create({
        title,
        content,
        userId,
        categoryId,
        isPublished,
        isDrafted
    })

    return idea
}

// FIND
const findIdea = async ({ id, isPublished = true, isDrafted = false}) => {  
    let where = {
        id
    }
    
    if(isPublished != null) where.isPublished = isPublished

    if(isDrafted != null) where.isDrafted = isDrafted

    const idea = await Idea.findOne({
        where,
        ...optIdea
    })

    return idea && processReturnedData(idea)
}

const findPublisedIdea = async ({ id }) => {
    const idea = await Idea.findOne({
        where: {
            id,
            isPublished: true
        },
        raw: true
    })
    return idea && processReturnedData(idea)
}

const findPendingIdea = async ({ id }) => {
    const idea = await Idea.findOne({
        where: {
            id,
            isPublished: false
        },
        raw: true
    })
    return idea && processReturnedData(idea)
}

const findAllIdeas = async ({
    limit, page, fieldSort, isPublished = true, isDrafted = false
}) => {
    let queryFindIdeas = {
        offset: 0,
        limit: 5,
        where: {},
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
            exclude: ['categoryId', 'userId'],
        }
    }
    let offset = (page - 1) * limit
    queryFindIdeas.offset = offset
    queryFindIdeas.limit = limit
    queryFindIdeas.order[0][0] = fieldSort
    if(isPublished != null) {
        queryFindIdeas.where.isPublished = isPublished
    } else {
        delete queryFindIdeas.where.isPublished
        queryFindIdeas.attributes.exclude = ['categoryId', 'userId']
    }
    if (isDrafted != null) {
        queryFindIdeas.where.isDrafted = isDrafted
    }
    else {
        delete queryFindIdeas.where.isDrafted
        queryFindIdeas.attributes.exclude = ['categoryId', 'userId']
    }
    let { count, rows: ideas } = await Idea.findAndCountAll(queryFindIdeas)

    return {
        ideas: processReturnedData(ideas),
        totalIdea: count
    }
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

const findIdeaPage = async ({ limit, page, q = null, fieldSort }) => {
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
            isPublished: null,
            ...search
        },
        ...optIdeaNoComment,
        order: [
            [fieldSort, 'DESC'],
            ['id', 'DESC']
        ],
    })

    return {
        ideas: processReturnedData(ideas),
        totalIdea: count
    }
}

const findUserIdByIdeaId = async ({
    id
}) => {
    const idea = await Idea.findByPk(id)
    return idea.userId
}

// OWN USER
const findAllOwnIdeas = async ({
    limit, page, userId, isPublished = true, isDrafted = false
}) => {
    let queryFindIdeas = {
        offset: 0,
        limit: 5,
        where: {},
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
            exclude: ['categoryId', 'userId'],
        }
    }
    let offset = (page - 1) * limit
    queryFindIdeas.offset = offset
    queryFindIdeas.limit = limit
    queryFindIdeas.where.userId = userId
    if (isPublished != null) {
        queryFindIdeas.where.isPublished = isPublished
    }
    else {
        delete queryFindIdeas.where.isPublished
    }
    if (isDrafted != null) {
        queryFindIdeas.where.isDrafted = isDrafted
    }
    else {
        delete queryFindIdeas.where.isDrafted
    }
    let { count, rows: ideas } = await Idea.findAndCountAll(queryFindIdeas)

    return {
        ideas: processReturnedData(ideas),
        totalIdea: count
    }
}
// ENDOWN USER

const increaseVoteCount = async ({
    ideaId, userId
}) => {
    const vote = await findVote({ ideaId, userId })
    const idea = await Idea.findByPk(ideaId)
    let updated = vote?.status == 1
    if(updated) return {
        voteCount: idea.voteCount,
        updated: !updated
    }

    const t = await sequelize.transaction()
    const point = await upVote({
        ideaId, userId
    })
    await idea.increment('voteCount', {
        by: point
    })
    await t.commit()
    return {
        voteCount: idea.voteCount,
        updated: !updated
    }
}

const decrementVoteCount = async ({
    ideaId, userId
}) => {
    const vote = await findVote({ ideaId, userId })
    const idea = await Idea.findByPk(ideaId)
    if(vote?.status == -1) return {
        voteCount: idea.voteCount
    }
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
    const vote = await findVote({ ideaId, userId })
    const idea = await Idea.findByPk(ideaId)
    if(vote == null) return {
        voteCount: idea.voteCount
    }
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
    if(ids.length === 0) return ids
    let ideas = []
    await Promise.all(await ids.map(async (id) => {
        let i = await Idea.findOne({
            where: {
                id,
                isDrafted: false,
                isPublished: true
            },
            ...optIdeaNoComment,
        })
        if(i) ideas.push(processReturnedData(i))
    }))
    return ideas
}

const findIdeasByCategoryId = async ({categoryId, limit, ideaId}) => {
    const ideas = await Idea.findAll({
        limit,
        where: {
            id: {
                [Op.not]: ideaId
            },
            categoryId,
            isPublished: true,
            isDrafted: false
        },
        ...optIdeaNoComment
    })
    return processReturnedData(ideas)
}

const findIdeasByVote = async ({ limit }) => {
    const ideas = await Idea.findAll({
        limit,
        ...optIdeaNoComment,
        order: [
            ['voteCount', 'DESC']
        ],
    })
    return processReturnedData(ideas)
}

const deleteIdea = async (id) => {
    const deleted = await Idea.destroy({
        where: {
            id
        }
    })
    return deleted
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
    findPendingIdea,
    findPublisedIdea,
    findIdeasByIds,
    findIdeasByCategoryId,
    findIdeasByVote,
    findUserIdByIdeaId,
    deleteIdea,
    findAllOwnIdeas,
}