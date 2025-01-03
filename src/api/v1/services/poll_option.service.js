'use strict'

const { createPollOptionForPoll } = require('../models/repo/poll_option.repo')
class PollOptionService {
    static createPollOptionForPoll = async ({
        pollId,
        options = [],
        votes = 0,
    }) => {
        return await createPollOptionForPoll({
            pollId,
            options,
            votes,
        })
    }
}

module.exports = PollOptionService
