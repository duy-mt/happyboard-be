'use strict'

const { BadRequest } = require("../core/error.response")
const { createComment, getCommentsByIdeaId } = require("../models/repo/comment.repo")
const { processReturnedData } = require("../utils")

class CommentService {
    static createComment = async ({
        content, userId, ideaId, parentId = null
    }) => {
        const savedComment = await createComment({
            content, userId, ideaId, parentId
        })

        return processReturnedData(savedComment)
    }

    static getCommentByIdeaId = async (ideaId) => {
        const { comments, totalCount: commentCount } = await getCommentsByIdeaId(ideaId)
        return {
            comments,
            commentCount
        }
    }

    static getCommentByParentId = async (parentId) => {
        const comments = getCommentsByParentId(parentId)

        return comments
    }
}

module.exports = CommentService