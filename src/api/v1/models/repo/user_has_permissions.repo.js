'use strict'

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

module.exports = {
    findPermissionsByUserId
}