'use strict'

const { BadRequest } = require("../core/error.response")
const { createComment, getCommentsByIdeaId } = require("../models/repo/comment.repo")

class CommentService {
    static createIdea = async ({
        content, userId, ideaId, parentId
    }) => {
        const comment = await createComment({
            content, userId, ideaId, parentId
        })

        return comment
    }

    static getCommentByIdeaId = async (ideaId) => {
        const comments = getCommentsByIdeaId(ideaId)

        return comments
    }

    static getCommentByParentId = async (parentId) => {
        const comments = getCommentsByParentId(parentId)

        return comments
    }
}

module.exports = CommentService