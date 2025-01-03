'use strict'

const { OK, Created } = require('../core/success.response')
const GroupService = require('../services/group.service')

class GroupController {

    updateBackgroundGroup = async (req, res, next) => {
        const { file } = req
        const userId = req.headers['x-client-id']
        new OK({
            message: 'Update background group successfully!',
            data: await GroupService.updateBackgroundGroup({
                file,
                userId,
                groupId: req.params.groupId,
            }),
        }).send(res)
    }

    updateAvatarGroup = async (req, res, next) => {
        const { file } = req
        const userId = req.headers['x-client-id']
        new OK({
            message: 'Update avatar group successfully!',
            data: await GroupService.updateAvatarGroup({
                file,
                userId,
                groupId: req.params.groupId,
            }),
        }).send(res)
    }

    createGroup = async (req, res, next) => {
        const { files } = req
        const userId = req.headers['x-client-id']
        new Created({
            message: 'Created group successfully!',
            data: await GroupService.createGroup({
                files,
                userId,
                body: req.body,
            }),
        }).send(res)
    }

    getAllGroups = async (req, res, next) => {
        new OK({
            message: 'Get all groups successfully',
            data: await GroupService.getAllGroups(),
        }).send(res)
    }

    getAllGroupsByUserId = async (req, res, next) => {
        new OK({
            message: 'Get all groups by user successfully',
            data: await GroupService.getAllGroupsByUserId(req.body.userId),
        }).send(res)
    }

    getGroupById = async (req, res, next) => {
        new OK({
            message: 'Get group successfully',
            data: await GroupService.getGroupById(req.params.groupId),
        }).send(res)
    }

    updateGroup = async (req, res, next) => {
        let payload = {
            ...req.body,
            groupId: req.params.groupId,
        }
        new OK({
            message: 'Update group successfully',
            data: await GroupService.updateGroup(payload),
        }).send(res)
    }

    deleteGroup = async (req, res, next) => {
        new OK({
            message: 'Delete group successfully',
            data: await GroupService.deleteGroup(req.params.groupId),
        }).send(res)
    }
}

module.exports = new GroupController()
