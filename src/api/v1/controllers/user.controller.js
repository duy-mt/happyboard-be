'use strict'

const { OK, Created } = require('../core/success.response')
const UserService = require('../services/user.service')

class UserController {
    addMemberToGroup = async (req, res, next) => {
        new OK({
            message: 'Add member successfully',
            data: await UserService.addMemberToGroup({
                memberId: req.body?.memberId,
                groupId: req.body?.groupId,
            }),
        }).send(res)
    }

    leaveGroup = async (req, res, next) => {
        const userId = req.headers['x-client-id']
        new OK({
            message: 'Leave group successfully',
            data: await UserService.leaveGroup({
                userId: userId,
                groupId: req.params.groupId,
            }),
        }).send(res)
    }

    getAllUsers = async (req, res, next) => {
        new OK({
            message: 'Get all users successfully',
            data: await UserService.getAllUsers(req.query),
        }).send(res)
    }

    getAllUsersForAddMemberToGroup = async (req, res, next) => {
        const userId = req.headers['x-client-id']
        new OK({
            message: 'Get all user for add member successfully',
            data: await UserService.getAllUsersForAddMemberToGroup({
                groupId: req.query.groupId,
                userId,
            }),
        }).send(res)
    }

    getUser = async (req, res, next) => {
        new OK({
            message: 'Get user successfully',
            data: await UserService.getUser(req.params),
        }).send(res)
    }

    getRole = async (req, res, next) => {
        new OK({
            message: 'Get role successfully',
            data: await UserService.getRole(req.params),
        }).send(res)
    }

    getAllPermissons = async (req, res, next) => {
        new OK({
            message: 'Get all permissions successfully',
            data: await UserService.getAllPermissons(req.params),
        }).send(res)
    }

    updateStatusUser = async (req, res, next) => {
        new OK({
            message: 'Change status user successfully',
            data: await UserService.updateStatusUser({
                userId: req.params.userId,
                adminId: req.body.userId,
                status: req.body.status,
            }),
        }).send(res)
    }

    addPermissionForUser = async (req, res, next) => {
        new OK({
            message: 'Add permission successfully',
            data: await UserService.addPermissionForUser({
                userId: req.params.userId,
                adminId: req.body.userId,
                permissions: req.body.permissions,
            }),
        }).send(res)
    }

    removePermissionsOfUser = async (req, res, next) => {
        new OK({
            message: 'Remove permission of user successfully',
            data: await UserService.removePermissionsOfUser({
                userId: req.params.userId,
                permissions: req.body.permissions,
            }),
        }).send(res)
    }

    addNewPermission = async (req, res, next) => {
        new OK({
            message: 'Add new permission successfully',
            data: await UserService.addNewPermission({
                name: req.body.name,
                description: req.body.description,
            }),
        }).send(res)
    }

    getAllPermissonsNotForAnUser = async (req, res, next) => {
        new OK({
            message: 'Get all permission not for an user successfully',
            data: await UserService.getAllPermissonsNotForAnUser(req.query),
        }).send(res)
    }

    deletePermission = async (req, res, next) => {
        new OK({
            message: 'delete permission successfully',
            data: await UserService.deletePermission(req.params.permissionId),
        }).send(res)
    }

    updatePermission = async (req, res, next) => {
        new OK({
            message: 'Update permission successfully',
            data: await UserService.updatePermission({
                permissionId: req.params.permissionId,
                name: req.body.name,
                description: req.body.description,
            }),
        }).send(res)
    }

    addNewRole = async (req, res, next) => {
        new OK({
            message: 'Add new role successfully',
            data: await UserService.addNewRole({
                name: req.body.name,
                description: req.body.description,
            }),
        }).send(res)
    }

    updateRoleNotForAnUser = async (req, res, next) => {
        new OK({
            message: 'Update role not for an user successfully',
            data: await UserService.updateRoleNotForAnUser({
                roleId: req.params.roleId,
                name: req.body.name,
                description: req.body.description,
            }),
        }).send(res)
    }

    getAllRolesNotForAnUser = async (req, res, next) => {
        new OK({
            message: 'Get all roles not for an user successfully',
            data: await UserService.getAllRolesNotForAnUser(req.query),
        }).send(res)
    }

    deleteRole = async (req, res, next) => {
        new OK({
            message: 'delete role successfully',
            data: await UserService.deleteRole(req.params.roleId),
        }).send(res)
    }

    addRoleForUser = async (req, res, next) => {
        new OK({
            message: 'Add role for user successfully',
            data: await UserService.addRoleForUser({
                userId: req.params.userId,
                roleId: req.body.roleId,
                adminId: req.body.userId,
            }),
        }).send(res)
    }

    updateActivityUser = async (req, res, next) => {
        new OK({
            message: 'Change status user successfully',
            data: await UserService.updateActivityUser({
                userId: req.params.userId,
                isOnline: req.body.isOnline,
            }),
        }).send(res)
    }

    getLatestUserOnline = async (req, res, next) => {
        new OK({
            message: 'Get latest user online successfully',
            data: await UserService.getLatestUserOnline(req.query),
        }).send(res)
    }

    addPermissionsForRole = async (req, res, next) => {
        new OK({
            message: 'Add permission for role successfully',
            data: await UserService.addPermissionsForRole({
                roleId: req.params.roleId,
                adminId: req.body.userId,
                permissions: req.body.permissions,
            }),
        }).send(res)
    }
}

module.exports = new UserController()
