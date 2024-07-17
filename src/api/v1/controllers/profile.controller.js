'use strict'

const { OK, Created } = require('../core/success.response')
const ProfileService = require('../services/profile.service')

class ProfileController {
    updateProfile = async (req, res, next) => {
        new OK({
            message: 'Update profile successfully!',
            data: await ProfileService.updateProfile(req.body)
        }).send(res)
    }

    getProfile = async (req, res, next) => {
        new OK({
            message: 'Get profile successfully!',
            data: await ProfileService.getProfile(req.body.userId)
        }).send(res)
    }
}

module.exports = new ProfileController()