'use strict'

const { OK, Created } = require('../core/success.response')
const UserService = require('../services/user.service')

class UserController {
    getAllUsers = async (req, res, next) => {
        new OK({
            message: 'Get all users successfully',
            data: await UserService.getAllUsers()
        }).send(res)
    }
}

module.exports = new UserController()