'use strict'

const { createVote, deleteVote, findVote } = require('../models/repo/vote.repo')
class VoteService {
    static createVote = async ({ ideaId, userId }) => {
        const { vote, isCreated } = await createVote({
            ideaId,
            userId,
        })
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

    static getMyUpvoted = async ({ limit = 10, page = 1, userId }) => {
        return await getMyUpvoted({
            limit, 
            page,
            userId,
        })
    }

    static getMyDownvoted = async ({ limit = 10, page = 1, userId }) => {
        return await getMyDownvoted({
            limit, 
            page,
            userId,
        })
    }
}

module.exports = VoteService
