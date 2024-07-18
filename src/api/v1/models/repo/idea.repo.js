'use strict'
const { QueryTypes, Op, where } = require('sequelize')
const { Idea, Comment, User, Category, sequelize } = require('../index')
const { upVote, createVote, deleteVote, findVote } = require('./vote.repo')
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
    attributes: ['id', 'title', 'content', 'voteCount', 'commentCount', 'createdAt', 'updatedAt']
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

    // const isUpdatedVote
    // const vote = await User.(
    //     {
    //       firstName: 'Bart',
    //       lastName: 'Simpson',
    //     },
    //     { transaction: t },
    //   );
    // await t.commit()
    return 1
    // await sequelize.transaction(async () => {
    //     const { vote, isCreated } = await createVote({
    //         userId, ideaId
    //     })
    //     if(isCreated) {
    //         await idea.increment('voteCount', {
    //             by: 1
    //         })
    //     }
    // })
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
    updateIdea
}