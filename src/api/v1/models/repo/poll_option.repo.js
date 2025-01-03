'use strict'

const { where } = require('sequelize')
const { Poll_option, sequelize } = require('../index')

const createPollOption = async ({ pollId, optionText, votes = 0 }) => {
    return await Poll_option.create({
        pollId,
        optionText,
        votes,
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

const upVoteForPoll = async ({ pollOptionId }) => {
    return await Poll_option.update(
        {
            votes: sequelize.literal('votes + 1'),
        },
        {
            where: {
                id: pollOptionId,
            },
        },
    )
        .then(([affectedRows]) => {
            console.log(`Số bản ghi bị ảnh hưởng: ${affectedRows}`)
        })
        .catch((error) => {
            console.error('Có lỗi xảy ra:', error)
        })
}

const findOptionById = async ({ pollOptionId }) => {
    return await Poll_option.findOne({
        where: {
            id: pollOptionId,
        },
    })
}

module.exports = {
    createPollOption,
    createPollOptionForPoll,
    upVoteForPoll,
    findOptionById
}
