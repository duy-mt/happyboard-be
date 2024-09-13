'use strict'

const { createVote, deleteVote, findVote } = require('../models/repo/vote.repo')
class VoteService {
    static createVote = async ({ ideaId, userId }) => {
        const { vote, isCreated } = await createVote({
            ideaId,
            userId,
        })
        // if(isCreated) {

        // }

        return vote
    }

    static deleteVote = async ({ ideaId, userId }) => {
        return await deleteVote({
            ideaId,
            userId,
        })
    }

    static getStatusVote = async ({ ideaId, userId }) => {
        const vote = await findVote({
            ideaId,
            userId,
        })
        if (vote) {
            if (vote.status == 1) return 'up'
            else if (vote.status == -1) return 'down'
        } else return null
    }
}

module.exports = VoteService
