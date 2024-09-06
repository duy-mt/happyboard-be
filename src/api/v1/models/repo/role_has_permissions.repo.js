'use strict'

const { processReturnedData } = require('../../utils')
const { Role_has_permissions } = require('../index')

const findPermissionIdsByRoleIds = async (roleIds = []) => {
    const permissions = new Set()

    await Promise.all(
        roleIds.map(async (roleId) => {
            const rolePermissions = await Role_has_permissions.findAll({
                where: { roleId },
                raw: true,
            })

            rolePermissions.forEach((p) => permissions.add(p.permissionId))
        }),
    )

    return Array.from(permissions)
}

const findPermissionIdsByRoleId = async (roleId) => {
    const rolePermissions = await Role_has_permissions.findAll({
        where: { roleId },
    })
    let data = processReturnedData(rolePermissions)
    return data.map((p) => p.permissionId)
}

module.exports = {
    findPermissionIdsByRoleIds,
    findPermissionIdsByRoleId,
}
