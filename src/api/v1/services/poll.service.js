'use strict'

const { createPoll } = require('../models/repo/poll.repo')
class PollService {
    static createPoll = async ({ ideaId, expireHour, remindBeforeExpireTime }) => {
        return await createPoll({
            ideaId,
            expireHour,
            remindBeforeExpireTime,
        })
    }

    static deletePoll = async ({ ideaId, userId }) => {
        return await deletePoll({
            ideaId,
            userId,
        })
    }
}

module.exports = PollService
