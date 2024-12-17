'use strict'

const { processReturnedData, removeField } = require('../../utils')
const { Role } = require('../index')

const findRoleById = async (roleId) => {
    let role = await Role.findOne({
        where: {
            id: roleId,
        },
        attributes: ['id', 'name', 'description'],
    })
    return processReturnedData(role)
}

const createNewRole = async ({ name, description }) => {
    const role = await Role.create({ name, description })
    return processReturnedData(role)
}

const updateRoleNotForAnUser = async ({ roleId, name, description }) => {
    return await Role.update(
        {
            name,
            description,
        },
        {
            where: {
                id: roleId,
            },
        },
    )
}

const findAllRolesNotForAnUser = async ({ offset, limit }) => {
    const { count, rows: roles } = await Role.findAndCountAll({
        offset,
        limit,
    })

    return {
        roles: processReturnedData(roles),
        count,
    }
}

const deleteRole = async (roleId) => {
    return await Role.destroy({
        where: {
            id: roleId,
        },
    })
}


module.exports = {
    findRoleById,
    createNewRole,
    updateRoleNotForAnUser,
    findAllRolesNotForAnUser,
    deleteRole
}
