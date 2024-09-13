'use strict'

const { OK } = require('../core/success.response')
const GoogleAnalyticsService = require('../services/google-analytics.service')
class GoogleAnalyticsController {
    getViewsByDay = async (req, res, next) => {
        new OK({
            message: 'Get GA views by hour successfully',
            data: await GoogleAnalyticsService.getViewsByDay(),
        }).send(res)
    }

    getEventsByDay = async (req, res, next) => {
        new OK({
            message: 'Get GA events by hour successfully',
            data: await GoogleAnalyticsService.getEventsByDay(),
        }).send(res)
    }
}

module.exports = new GoogleAnalyticsController()
