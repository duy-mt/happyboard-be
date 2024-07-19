'use strict'

const { OK, Created } = require('../core/success.response')
const IdeaService = require('../services/idea.service')
const CommentService = require('../services/comment.service')

class IdeaController {
    getIdea = async (req, res, next) => {
        new OK({
            message: 'Get idea successfully',
            data: await IdeaService.getIdea({
                id: req.params.ideaId,
                userId: req.body.userId
            })
        }).send(res)
    }

    getAllIdeas = async (req, res, next) => {
        const {q} = req.query
        if(!q) {
            new OK({
                message: 'Get ideas successfully',
                data: await IdeaService.getAllIdeas({
                    limit: req.query?.limit,
                    page: req.query?.page,
                    userId: req.body.userId
                })
            }).send(res)
        } else {
            console.log('q::', q);
            new OK({
                message: 'Get ideas successfully',
                data: await IdeaService.searchIdea({
                    q: req.query.q,
                    limit: req.query.limit,
                    page: req.query.page,
                    userId: req.body.userId,
                })
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
            data: await IdeaService.publishIdea({
                ideaId: req.params.ideaId,
                userId: req.body.userId
            })
        }).send(res)
    }

    unPublishIdea = async (req, res, next) => {
        new OK({
            message: 'Unpublish successfully',
            data: await IdeaService.unPublishIdea({
                ideaId: req.params.ideaId,
                userId: req.body.userId
            })
        }).send(res)
    }

    getRecentIdeas = async (req, res, next) => {
        new OK({
            message: 'Get recent ideas successfully',
            data: await IdeaService.getRecentIdeas(req.body.userId)
        }).send(res)
    }

    getSimilarIdeas = async (req, res, next) => {
        new OK({
            message: 'Get similar ideas successfully',
            data: await IdeaService.getSimilarIdeas({
                ideaId: req.query.id,
                limit: req.query.limit
            })
        }).send(res)
    }

    getPopularIdeas = async (req, res, next) => {
        new OK({
            message: 'Get popular ideas successfully',
            data: await IdeaService.getPopularIdeas({
                limit: req.query.limit
            })
        }).send(res)
    }
}

module.exports = new IdeaController()