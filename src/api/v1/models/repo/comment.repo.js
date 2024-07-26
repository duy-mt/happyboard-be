'use strict'

const { processReturnedData } = require('../../utils')
const { Comment, User, Idea } = require('../index')

/*
FROM - WHERE - GROUP BY - HAVING - ORDER BY
*/
const queryCommentWithReaction = {
    include: [
        {
            model: User,
            attributes: ['id', 'username', 'email'],
        }
    ],
    attributes: { },
    order: [
        ['createdAt', 'DESC'],
        ['id', 'DESC']
    ]
}

const createComment = async ({
    content, userId, ideaId, parentId
}) => {
    const comment = Comment.create({
        content, userId, ideaId, parentId
    })

    const idea = await Idea.findByPk(ideaId)

    await idea.increment('commentCount', {
        by: 1
    })

    return comment
}

// FIND
const getCommentsByIdeaId = async (ideaId) => {
    const [comments, totalCount] = await Promise.all([
        Comment.findAll({ 
            where: { ideaId },
            ...queryCommentWithReaction
        }),
        Comment.count({ where: { ideaId } })
    ])

    return { comments: processReturnedData(comments), totalCount }
}

const getCommentsByParentId = async (parentId) => await Comment.findAll({
    where: { parentId }
})

const getCommentById = async (id) => {
    return await Comment.findByPk(id, {
        raw: true
    })
}
module.exports = {
    createComment,
    getCommentsByIdeaId,
    getCommentsByParentId,
    getCommentById
}