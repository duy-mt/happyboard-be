'use strict'

const { OK, Created } = require('../core/success.response')
const IdeaService = require('../services/idea.service')
const CommentService = require('../services/comment.service')

class IdeaController {
    getIdea = async (req, res, next) => {
        new OK({
            message: 'Get idea successfully',
            data: await IdeaService.getIdea(req.params.ideaId)
        }).send(res)
    }

    getAllIdeas = async (req, res, next) => {
        const {q} = req.query
        if(!q) {
            new OK({
                message: 'Get ideas successfully',
                data: await IdeaService.getAllIdeas(req.query)
            }).send(res)
        } else {
            new OK({
                message: 'Get ideas successfully',
                data: await IdeaService.searchIdea(req.query)
            }).send(res)
        }
    }

    getAllPublisedIdeas = async (req, res, next) => {
        new OK({
            message: 'Get idea successfully',
            data: await IdeaService.getAllPublisedIdeas(req.body.userId)
        }).send(res)
    }

    createIdea = async (req, res, next) => {
        new Created({
            message: 'Created idea successfully!',
            data: await IdeaService.createIdea(req.body)
        }).send(res)
    }

    upVoteCount = async (req, res, next) => {
        new OK({
            message: 'Up voteCount successfully',
            data: await IdeaService.upVoteCount({
                ideaId: req.params.ideaId,
                userId: req.body.userId
            })
        }).send(res)
    }

    downVoteCount = async (req, res, next) => {
        new OK({
            message: 'Down voteCount successfully',
            data: await IdeaService.downVoteCount({
                ideaId: req.params.ideaId,
                userId: req.body.userId
            })
        }).send(res)
    }

    cancelVote = async (req, res, next) => {
        new OK({
            message: 'Cancel vote successfully',
            data: await IdeaService.cancelVote({
                ideaId: req.params.ideaId,
                userId: req.body.userId
            })
        }).send(res)
    }

    createComment = async (req, res, next) => {
        req.body.ideaId = req.params.ideaId
        new Created({
            message: 'Comment successfully',
            data: await CommentService.createComment(req.body)
        }).send(res)
    }

    getCommentByIdeaId = async (req, res, next) => {
        new OK({
            message: 'Comment successfully',
            data: await CommentService.getCommentByIdeaId(req.params.ideaId)
        }).send(res)
    }

    publishIdea = async (req, res, next) => {
        new OK({
            message: 'Publish successfully',
            data: await IdeaService.publishIdea(req.params.ideaId)
        }).send(res)
    }

    unPublishIdea = async (req, res, next) => {
        new OK({
            message: 'Unpublish successfully',
            data: await IdeaService.unPublishIdea(req.params.ideaId)
        }).send(res)
    }
}

module.exports = new IdeaController()