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
        exclude: ['isPublished', 'categoryId', 'userId'],
    }
}

const baseQueryFindIdeas = {
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
const findIdea = async ({ id, isPublished = true }) => {  
    let where = {
        id
    }
    
    if(isPublished != null) where.isPublished = isPublished

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

const findDraftIdea = async ({ id }) => {
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
    limit, page, fieldSort, isPublished = true
}) => {
    console.log(`isPublished::`, isPublished)
    // DEFINE query
    let queryFindIdeas = { ...baseQueryFindIdeas }
    console.log(`queryFindIdeas Before:`, queryFindIdeas);
    let offset = (page - 1) * limit
    queryFindIdeas.offset = offset
    queryFindIdeas.limit = limit
    queryFindIdeas.order[0][0] = fieldSort
    if(isPublished != null) {
        queryFindIdeas.where.isPublished = isPublished
    } else {
        queryFindIdeas.attributes.exclude = ['categoryId', 'userId']
    }
    console.log(`queryFindIdeas After:`, queryFindIdeas);
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
    limit, page, userId
}) => {
    let queryFindIdeas = { ...baseQueryFindIdeas }
    let offset = (page - 1) * limit
    queryFindIdeas.offset = offset
    queryFindIdeas.limit = limit
    queryFindIdeas.where.id = userId
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
    if(vote?.status == 1) return {
        voteCount: idea.voteCount
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
        voteCount: idea.voteCount
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
    findDraftIdea,
    findPublisedIdea,
    findIdeasByIds,
    findIdeasByCategoryId,
    findIdeasByVote,
    findUserIdByIdeaId,
    deleteIdea,
    findAllOwnIdeas,
}