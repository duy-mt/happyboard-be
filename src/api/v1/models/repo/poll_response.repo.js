const { where } = require('sequelize')
const { Poll_response, sequelize } = require('../index')

const createPollResponse = async ({ userId, pollId, pollOptionId }) => {
    return await Poll_response.create({ userId, pollId, pollOptionId })
}

const findConfirmVotedPoll = async ({ userId, pollId, pollOptionId }) => {
    return await Poll_response.findAll({
        where: {
            userId: userId,
            pollId: pollId,
            pollOptionId: pollOptionId,
        },
    })
}

module.exports = {
    createPollResponse,
    findConfirmVotedPoll
}
