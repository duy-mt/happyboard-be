'use strict'

const { OK, Created } = require('../core/success.response')
const VoteService = require('../services/vote.service')

class VoteController {
    upVote = async (req, res, next) => {
        new Created({
            message: 'Up vote successfully!',
            data: await VoteService.createVote(req.body)
        }).send(res)
    }

    cancelVote = async (req, res, next) => {
        new OK({
            message: 'Cancel vote successfully!',
            data: await VoteService.deleteVote(req.body)
        }).send(res)
    }
}

module.exports = new VoteController()