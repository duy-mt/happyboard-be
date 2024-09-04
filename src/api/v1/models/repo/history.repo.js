'use strict'

const { processReturnedData } = require('../../utils')
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
    type, userId, userTargetId, objectTargetId, objectTargetLv2Id = null, contentIdea = null, contentComment = null
}) => {
    const history = await History.create({
        type, userId, userTargetId, objectTargetId, objectTargetLv2Id, contentIdea, contentComment
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
    return processReturnedData(histories)
}

module.exports = {
    createHistory,
    findHistoriesByUserId
}