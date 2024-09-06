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
                userId: req.body.userId,
            }),
        }).send(res)
    }

    getOwnDraftedIdea = async (req, res, next) => {
        new OK({
            message: 'Get drafted idea successfully',
            data: await IdeaService.getOwnDraftedIdea({
                id: req.params.ideaId,
                userId: req.body.userId,
            }),
        }).send(res)
    }

    getOwnHidedIdea = async (req, res, next) => {
        new OK({
            message: 'Get hided idea successfully',
            data: await IdeaService.getOwnHidedIdea({
                id: req.params.ideaId,
                userId: req.body.userId,
            }),
        }).send(res)
    }

    updateIdea = async (req, res, next) => {
        new OK({
            message: 'Update idea successfully',
            data: await IdeaService.updateIdea({
                ideaId: req.params.ideaId,
                payload: req.body,
            }),
        }).send(res)
    }

    getAllOwnIdeas = async (req, res, next) => {
        new OK({
            message: 'Get own ideas successfully',
            data: await IdeaService.getAllOwnIdeas({
                limit: req.query?.limit,
                page: req.query?.page,
                userId: req.body.userId,
            }),
        }).send(res)
    }

    getAllOwnPublishedIdeas = async (req, res, next) => {
        new OK({
            message: 'Get own published ideas successfully',
            data: await IdeaService.getAllOwnPublishedIdeas({
                limit: req.query?.limit,
                page: req.query?.page,
                userId: req.body.userId,
            }),
        }).send(res)
    }

    getAllOwnHidedIdeas = async (req, res, next) => {
        new OK({
            message: 'Get own hided ideas successfully',
            data: await IdeaService.getAllOwnHidedIdeas({
                limit: req.query?.limit,
                page: req.query?.page,
                userId: req.body.userId,
            }),
        }).send(res)
    }

    getAllOwnDraftedIdeas = async (req, res, next) => {
        new OK({
            message: 'Get own drafted ideas successfully',
            data: await IdeaService.getAllOwnDraftedIdeas({
                limit: req.query?.limit,
                page: req.query?.page,
                userId: req.body.userId,
            }),
        }).send(res)
    }

    getAllIdeas = async (req, res, next) => {
        const { q } = req.query
        if (!q) {
            new OK({
                message: 'Get ideas successfully',
                data: await IdeaService.getAllIdeas({
                    limit: req.query?.limit,
                    page: req.query?.page,
                    userId: req.body.userId,
                    option: req.query?.option,
                }),
            }).send(res)
        } else {
            new OK({
                message: 'Get ideas successfully',
                data: await IdeaService.searchIdea({
                    q: req.query.q,
                    limit: req.query.limit,
                    page: req.query.page,
                    userId: req.body.userId,
                }),
            }).send(res)
        }
    }

    getAllPublishedIdeas = async (req, res, next) => {
        console.log(`getAllPublishedIdeas`)
        const { q } = req.query
        if (!q) {
            new OK({
                message: 'Get publish ideas successfully',
                data: await IdeaService.getAllPublisedIdeas({
                    limit: req.query?.limit,
                    page: req.query?.page,
                    userId: req.body.userId,
                    option: req.query?.option,
                    categories: req.query?.categories,
                }),
            }).send(res)
        } else {
            new OK({
                message: 'Get ideas successfully',
                data: await IdeaService.searchIdea({
                    q: req.query.q,
                    limit: req.query.limit,
                    page: req.query.page,
                    userId: req.body.userId,
                }),
            }).send(res)
        }
    }

    getAllPendingIdeas = async (req, res, next) => {
        const { q } = req.query
        if (!q) {
            new OK({
                message: 'Get draft ideas successfully',
                data: await IdeaService.getAllPengindIdeas({
                    limit: req.query?.limit,
                    page: req.query?.page,
                    userId: req.body.userId,
                    option: req.query?.option,
                }),
            }).send(res)
        } else {
            new OK({
                message: 'Get ideas successfully',
                data: await IdeaService.searchIdea({
                    q: req.query.q,
                    limit: req.query.limit,
                    page: req.query.page,
                    userId: req.body.userId,
                }),
            }).send(res)
        }
    }

    createIdea = async (req, res, next) => {
        new Created({
            message: 'Created idea successfully!',
            data: await IdeaService.createIdea(req.body),
        }).send(res)
    }

    draftIdea = async (req, res, next) => {
        new Created({
            message: 'Drafted idea successfully!',
            data: await IdeaService.draftIdea(req.body),
        }).send(res)
    }

    upVoteCount = async (req, res, next) => {
        new OK({
            message: 'Up voteCount successfully',
            data: await IdeaService.upVoteCount({
                ideaId: req.params.ideaId,
                userId: req.body.userId,
            }),
        }).send(res)
    }

    downVoteCount = async (req, res, next) => {
        new OK({
            message: 'Down voteCount successfully',
            data: await IdeaService.downVoteCount({
                ideaId: req.params.ideaId,
                userId: req.body.userId,
            }),
        }).send(res)
    }

    cancelVote = async (req, res, next) => {
        new OK({
            message: 'Cancel vote successfully',
            data: await IdeaService.cancelVote({
                ideaId: req.params.ideaId,
                userId: req.body.userId,
            }),
        }).send(res)
    }

    createComment = async (req, res, next) => {
        req.body.ideaId = req.params.ideaId
        new Created({
            message: 'Comment successfully',
            data: await CommentService.createComment(req.body),
        }).send(res)
    }

    getCommentByIdeaId = async (req, res, next) => {
        new OK({
            message: 'Comment successfully',
            data: await CommentService.getCommentByIdeaId({
                userId: req.body.userId,
                ideaId: req.params.ideaId,
            }),
        }).send(res)
    }

    publishIdea = async (req, res, next) => {
        new OK({
            message: 'Publish successfully',
            data: await IdeaService.publishIdea({
                ideaId: req.params.ideaId,
                adminId: req.body.userId,
            }),
        }).send(res)
    }

    unPublishIdea = async (req, res, next) => {
        new OK({
            message: 'Unpublish successfully',
            data: await IdeaService.unPublishIdea({
                ideaId: req.params.ideaId,
                userId: req.body.userId,
            }),
        }).send(res)
    }

    getRecentIdeas = async (req, res, next) => {
        new OK({
            message: 'Get recent ideas successfully',
            data: await IdeaService.getRecentIdeas(req.body.userId),
        }).send(res)
    }

    getSimilarIdeas = async (req, res, next) => {
        new OK({
            message: 'Get similar ideas successfully',
            data: await IdeaService.getSimilarIdeas({
                ideaId: req.query.id,
                limit: req.query.limit,
            }),
        }).send(res)
    }

    getPopularIdeas = async (req, res, next) => {
        new OK({
            message: 'Get popular ideas successfully',
            data: await IdeaService.getPopularIdeas({
                limit: req.query.limit,
            }),
        }).send(res)
    }

    deleteIdea = async (req, res, next) => {
        new OK({
            message: 'Delete idea successfully',
            data: await IdeaService.deleteIdea({
                ideaId: req.params.ideaId,
                userId: req.body.userId,
            }),
        }).send(res)
    }
}

module.exports = new IdeaController()
