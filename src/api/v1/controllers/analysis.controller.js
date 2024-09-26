'use strict'

const { OK, Created } = require('../core/success.response')
const AnalysisService = require('../services/analysis.service')

class AnalysisController {
    getChartNewUsers = async (req, res, next) => {
        new OK({
            message: 'Get chart new user successfully',
            data: await AnalysisService.getChartNewUsers(req.query),
        }).send(res)
    }

    getChartIdeas = async (req, res, next) => {
        new OK({
            message: 'Get chart new user successfully',
            data: await AnalysisService.getChartIdeas(req.query),
        }).send(res)
    }
}

module.exports = new AnalysisController()
