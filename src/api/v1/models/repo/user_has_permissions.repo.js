'use strict'

const { Op } = require('sequelize')
const { User_has_permissions } = require('../index')

const findPermissionsByUserId = async (userId) => {
    const permissions = await User_has_permissions.findAll({
        where: {
            userId: userId
        },
        attributes: ['permissionId'],
        raw: true
    })
    return permissions.map(p => p.permissionId)
}

const createPermission = async ({ userId, permissions }) => {
    if (!Array.isArray(permissions)) {
        throw new Error("Permissions must be an array");
    }

    const userPermissions = permissions.map(permissionId => ({
        userId,
        permissionId
    }))

    let rows = await User_has_permissions.bulkCreate(userPermissions)

    return rows
}

const deletePermissionOfUser = async ({ userId, permissions }) => {
    if (!Array.isArray(permissions)) {
        throw new Error("Permissions must be an array");
    }

    const result = await User_has_permissions.destroy({
        where: {
            userId,
            permissionId: {
                [Op.in]: permissions
            }
        }
    })

    return result
}

module.exports = {
    findPermissionsByUserId,
    createPermission,
    deletePermissionOfUser
}