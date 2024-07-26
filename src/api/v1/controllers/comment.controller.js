'use strict'

const { OK, Created } = require('../core/success.response')
const CommentService = require('../services/comment.service')

class CommentController {
    createComment = async (req, res, next) => {
        new Created({
            message: 'Created comment successfully!',
            data: await CommentService.createComment(req.body)
        }).send(res)
    }

    reactionComment = async (req, res, next) => {
        new Created({
            message: "Reaction comment successfully",
            data: await CommentService.reactionComment({
                commentId: req.params.commentId,
                userId: req.body.userId,
                reaction: req.body.reaction
            })
        }).send(res)
    }

    cancelReaction = async (req, res, next) => {
        new Created({
            message: "Cancel reaction successfully",
            data: await CommentService.cancelReaction({
                commentId: req.params.commentId,
                userId: req.body.userId
            })
        }).send(res)
    }
}

module.exports = new CommentController()