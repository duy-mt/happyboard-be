'use strict'

const { OK } = require("../core/success.response")
const GoogleAnalyticsService = require('../services/google-analytics.service')
class GoogleAnalyticsController {
    getViewsByHour = async (req, res, next) => {
        new OK({
            message: 'Get GA views by hour successfully',
            data: await GoogleAnalyticsService.getViewsByHour()
        }).send(res)
    }

    getEventsByHour = async (req, res, next) => {
        new OK({
            message: 'Get GA events by hour successfully',
            data: await GoogleAnalyticsService.getEventByHour()
        }).send(res)
    }
}

module.exports = new GoogleAnalyticsController()