'use strict'

const { OK, Created } = require('../core/success.response')
const UserService = require('../services/user.service')

class UserController {
    getAllUsers = async (req, res, next) => {
        new OK({
            message: 'Get all users successfully',
            data: await UserService.getAllUsers(req.query)
        }).send(res)
    }

    getUser = async (req, res, next) => {
        new OK({
            message: 'Get user successfully',
            data: await UserService.getUser(req.params)
        }).send(res)
    }

    getRole = async (req, res, next) => {
        new OK({
            message: 'Get role successfully',
            data: await UserService.getRole(req.params)
        }).send(res)
    }

    getAllPermissons = async (req, res, next) => {
        new OK({
            message: 'Get all permissions successfully',
            data: await UserService.getAllPermissons(req.params)
        }).send(res)
    }

    updateStatusUser = async (req, res, next) => {
        new OK({
            message: 'Change status user successfully',
            data: await UserService.updateStatusUser({
                userId: req.params.userId,
                adminId: req.body.userId,
                status: req.body.status
            })
        }).send(res)
    }

    addPermissions = async (req, res, next) => {
        new OK({
            message: 'Add permission successfully',
            data: await UserService.addPermission({
                userId: req.params.userId,
                adminId: req.body.userId,
                permissions: req.body.permissions
            })
        }).send(res)
    }

    removePermissions = async (req, res, next) => {
        new OK({
            message: 'Remove permission successfully',
            data: await UserService.removePermission({
                userId: req.params.userId,
                adminId: req.body.userId,
                permissions: req.body.permissions
            })
        }).send(res)
    }

    updateRole = async (req, res, next) => {
        new OK({
            message: 'Update role successfully',
            data: await UserService.updateRole({
                userId: req.params.userId,
                roleId: req.body.roleId,
                adminId: req.body.userId
            })
        }).send(res)
    }

    updateActivityUser = async (req, res, next) => {
        new OK({
            message: 'Change status user successfully',
            data: await UserService.updateActivityUser({
                userId: req.params.userId,
                isOnline: req.body.isOnline
            })
        }).send(res)
    }

    getLatestUserOnline = async (req, res, next) => {
        new OK({
            message: 'Get latest user online successfully',
            data: await UserService.getLatestUserOnline(req.query)
        }).send(res)
    }
}

module.exports = new UserController()