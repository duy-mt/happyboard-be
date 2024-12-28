'use strict'

const { Poll_option } = require('../index')

const createPollOption = async ({ pollId, optionText, votesCount = 0 }) => {
    return await Poll_option.create({
        pollId,
        optionText,
        votesCount,
    })
}

const createPollOptionForPoll = async ({ pollId, options, votesCount = 0 }) => {
    if (!Array.isArray(options)) {
        throw new Error('Options must be an array')
    }
    const optionsForPoll = options.map((option) => ({
        pollId,
        optionText: option,
        votesCount,
    }))

    let rows = await Poll_option.bulkCreate(optionsForPoll)

    return rows
}

module.exports = {
    createPollOption,
    createPollOptionForPoll,
}
