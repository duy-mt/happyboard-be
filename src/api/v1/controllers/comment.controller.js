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

    getCommentsByIdeaId = async (req, res, next) => {
        new OK({
            message: 'Get comment successfully!',
            data: await CommentService.getCommentByIdeaId(req.params.ideaId)
        }).send(res)
    }

    // getCommentsByParentId = async (req, res, next) => {
    //     new OK({
    //         message: 'Get comment successfully!',
    //         data: await CommentService.getCommentByParentId(req.params.parentId)
    //     }).send(res)
    // }

}

module.exports = new CommentController()