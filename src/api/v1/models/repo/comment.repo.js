'use strict'

const { Comment } = require('../index')

const createComment = async ({
    content, userId, ideaId, patentId = null
}) => {
    const comment = Comment.create({
        content, userId, ideaId, patentId
    })

    return comment
}

// FIND
const getCommentsByIdeaId = async (ideaId) => await Comment.findAll({
    where: { ideaId }
})

const getCommentsByParentId = async (parentId) => await Comment.findAll({
    where: { parentId }
})

module.exports = {
    createComment,
    getCommentsByIdeaId,
    getCommentsByParentId
}