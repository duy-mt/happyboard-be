'use strict'

const { processReturnedData } = require('../../utils')
const { Permission } = require('../index')

const findPermissionIdByName = async (name) => {
    console.log(name)
    const permission = await Permission.findOne({
        where: { name },
        attributes: ['id'],
        raw: true,
    })

    return permission ? permission.id : null
}

const findPermissionsByIds = async (ids = []) => {
    const permission = await Permission.findAll({
        where: {
            id: ids,
        },
        attributes: ['id', 'name', 'description'],
    })
    return processReturnedData(permission)
}

const createNewPermisision = async ({ name, description }) => {
    const permission = await Permission.create({ name, description })
    return processReturnedData(permission)
}

const findAllPermissionsNotForAnUser = async ({ offset, limit }) => {
    const { count, rows: permissions } = await Permission.findAndCountAll({
        offset,
        limit,
    })

    return {
        permissions: processReturnedData(permissions),
        count,
    }
}

const deletePermission = async (permissionId) => {
    return await Permission.destroy({
        where: {
            id: permissionId,
        },
    })
}

const updatePermission = async ({ permissionId, name, description }) => {
    return await Permission.update(
        {
            name,
            description,
        },
        {
            where: {
                id: permissionId,
            },
        },
    )
}

module.exports = {
    findPermissionIdByName,
    findPermissionsByIds,
    createNewPermisision,
    findAllPermissionsNotForAnUser,
    deletePermission,
    updatePermission,
}
