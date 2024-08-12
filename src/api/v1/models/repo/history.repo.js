'use strict'

const { History } = require('../index')

const queryHistory = {
    limit: 5,
    offset: 1,
    order: [
        ['createdAt', 'DESC']
    ],
    where: {
        userId: null
    }
}

const createHistory = async ({
    type, userId, userTargetId, objectTargetId
}) => {
    const history = await History.create({
        type, userId, userTargetId, objectTargetId
    })

    return history
}

const findHistoriesByUserId = async ({
    userId, limit, offset
}) => {
    queryHistory.limit = limit
    queryHistory.offset = offset
    queryHistory.where.userId = userId
    const histories = await History.findAll(queryHistory)
    return histories
}

module.exports = {
    createHistory,
    findHistoriesByUserId
}