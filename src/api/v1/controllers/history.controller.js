'use strict'

const { OK } = require("../core/success.response")
const HistoryService = require("../services/history.service")

class HistoryController {
    getHistories = async (req, res, next) => {
        new OK({
            message: 'Get histories successfully',
            data: await HistoryService.getAllHistories({
                userId: req.body.userId,
                limit: req.query.limit,
                page: req.query.page,
            })
        }).send(res)
    }
}

module.exports = new HistoryController()