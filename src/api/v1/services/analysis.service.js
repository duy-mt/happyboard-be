'use strict'

const {
    getInfoNewUserByDate,
    getInfoIdeasByDate,
} = require('../models/repo/analysis.repo')

class AnalysisService {
    static getChartNewUsers = async ({ recentDays }) => {
        let time
        if (recentDays) {
            if (recentDays > 1) time = `${recentDays} days`
            if (recentDays == 1) time = `${recentDays} day`
        }
        let info = await getInfoNewUserByDate(time)
        return info
    }

    static getChartIdeas = async ({ recentDays, isPublished }) => {
        let time
        if (recentDays) {
            if (recentDays > 1) time = `${recentDays} days`
            if (recentDays == 1) time = `${recentDays} day`
        }
        let info = await getInfoIdeasByDate(time, isPublished)
        return info
    }
}

module.exports = AnalysisService
