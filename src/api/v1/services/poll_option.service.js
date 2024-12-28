'use strict'

const { createPollOptionForPoll } = require('../models/repo/poll_option.repo')
class PollOptionService {
    static createPollOptionForPoll = async ({
        pollId,
        options = [],
        votesCount = 0
    }) => {
        return await createPollOptionForPoll({
            pollId,
            options,
            votesCount
        })
    }
}

module.exports = PollOptionService
