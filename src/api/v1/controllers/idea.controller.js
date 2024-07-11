'use strict'

const { OK, Created } = require('../core/success.response')
const IdeaService = require('../services/idea.service')

class IdeaController {
    getIdea = async (req, res, next) => {
        new OK({
            message: 'Get idea successfully',
            metadata: await IdeaService.getIdea(req.params.ideaId)
        }).send(res)
    }

    getAllIdeas = async (req, res, next) => {
        const {q} = req.query
        if(!q) {
            new OK({
                message: 'Get all ideas successfully',
                metadata: await IdeaService.getAllIdeas(req.query)
            }).send(res)
        } else {
            new OK({
                message: 'Get all ideas successfully',
                metadata: await IdeaService.searchIdea(req.query)
            }).send(res)
        }
    }

    getAllIdeasByUserId = async (req, res, next) => {
        new OK({
            message: 'Get all ideas for user successfully',
            metadata: await IdeaService.getAllIdeasByUserId(req.params.userId)
        }).send(res)
    }

    createIdea = async (req, res, next) => {
        new Created({
            message: 'Created idea successfully!',
            metadata: await IdeaService.createIdea(req.body)
        }).send(res)
    }

    upVoteCount = async (req, res, next) => {
        new OK({
            message: 'Up voteCount successfully',
            metadata: await IdeaService.upVoteCount(req.body)
        }).send(res)
    }

    // searchIdea = async (req, res, next) => {
    //     new OK({
    //         message: 'Find data successfully',
    //         metadata: await IdeaService.searchIdea(req.query)
    //     })
    // }
}

module.exports = new IdeaController()