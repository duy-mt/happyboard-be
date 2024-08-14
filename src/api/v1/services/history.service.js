'use strict'

const { HISTORY_LOGS } = require("../constants")
const { BadRequest } = require("../core/error.response")
const { createHistory, findHistoriesByUserId } = require("../models/repo/history.repo")
const { responseHistory } = require('../utils/index')

class HistoryService {
    static createHistory = async ({
        type, userId, userTargetId, objectTargetId, objectTargetLv2Id = null, contentIdea = null, contentComment = null
    }) => {
        if(Object.keys(HISTORY_LOGS).includes(type)) {
            await createHistory({type, userId, userTargetId, objectTargetId, objectTargetLv2Id, contentIdea, contentComment})
        } else {
            console.log(`Missing history log. Not found type of logs`)
        }
    }

    static getAllHistories = async ({
        userId, limit = 5, page = 1
    }) => {
        if(!userId) throw new BadRequest('Missing User Id')
        let offset = (page - 1) * limit
        const histories = await findHistoriesByUserId({
            userId, limit, offset
        })
        return histories
    }
}

module.exports = HistoryService