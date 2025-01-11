'use strict'

const { BadRequest } = require('../core/error.response')
const {
    createGroup,
    getAllGroups,
    getGroupById,
    updateGroup,
    deleteGroup,
} = require('../models/repo/group.repo')
const { removeField } = require('../utils')
const {
    createGroupForUser,
    findGroupsByUserId,
} = require('../models/repo/user_has_groups.repo')
const { sequelize, Sequelize } = require('../models')
const UploadService = require('./upload.service')
const HistoryService = require('./history.service')

class GroupService {
    static updateBackgroundGroup = async ({ file, userId, groupId }) => {
        let payload = {}
        if (file) {
            let background = null

            if (file.mimetype.startsWith('image/')) {
                const image = await UploadService.uploadFromBuffer({
                    file,
                    folderName: 'group/background',
                    filename: `${userId}_${Date.now()}`,
                })
                background = image.url
            }

            payload = {
                background,
            }
        }

        await updateGroup({ groupId, payload })

        return 1
    }

    static updateAvatarGroup = async ({ file, userId, groupId }) => {
        let payload = {}
        if (file) {
            let avatar = null

            if (file.mimetype.startsWith('image/')) {
                const image = await UploadService.uploadFromBuffer({
                    file,
                    folderName: 'group/avatar',
                    filename: `${userId}_${Date.now()}`,
                })
                avatar = image.url
            }

            payload = {
                avatar,
            }
        }

        await updateGroup({ groupId, payload })

        return 1
    }

    static createGroup = async ({ files, userId, body }) => {
        if (!body.name || !body.description)
            throw new BadRequest('Name group and description are required')

        const transaction = await sequelize.transaction()

        let urls = []
        // let urlsString = ''

        if (files && files.length > 0) {
            const uploadPromises = files.map(async (file) => {
                if (file.mimetype.startsWith('image/')) {
                    const image = await UploadService.uploadFromBuffer({
                        file,
                        folderName: 'group/',
                        filename: `${userId}_${Date.now()}`,
                    })
                    return image.url
                }
            })

            const uploadResults = await Promise.all(uploadPromises)
            urls = uploadResults.filter((result) => result)
            // urlsString = urls.join(',')
        }

        body.avatar = urls[0]
        body.background = urls[1]

        const group = await createGroup(
            {
                name: body.name,
                description: body.description,
                avatar: body.avatar,
                background: body.background,
            },
            { transaction },
        )

        await createGroupForUser(
            { userId: userId, groupId: group.id },
            { transaction },
        )

        await HistoryService.createHistory({
            type: 'CG01',
            userId,
            userTargetId: userId,
            objectTargetId: group.id,
            contentIdea: group.name,
        })

        return 1
    }

    static getAllGroups = async () => {
        const { groups, total } = await getAllGroups()

        return {
            total,
            groups,
        }
    }

    static getAllGroupsByUserId = async (userId) => {
        const { count: total, rows: groups } = await findGroupsByUserId(userId)

        return {
            total,
            groups,
        }
    }

    static getGroupById = async (id) => {
        const group = await getGroupById({ id })
        if (!group) throw new BadRequest('Group is not exist')
        return group
    }

    static updateGroup = async ({
        groupId,
        name,
        description,
        background,
        avatar,
    }) => {
        if (!groupId) throw new BadRequest('Group ID is required')
        await this.getGroupById(groupId)
        let prePayload = {
            name,
            description,
            background,
            avatar,
        }
        // Remove field null
        const payload = removeField({
            obj: prePayload,
        })

        const updatedGroup = await updateGroup({
            groupId,
            payload,
        })

        return updatedGroup[0]
    }

    static deleteGroup = async (groupId) => {
        await this.getGroupById(groupId)
        const deleted = await deleteGroup(groupId)
        return deleted
    }
}

module.exports = GroupService
