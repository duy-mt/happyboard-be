const { processReturnedData } = require('../../utils')
const { User_has_roles } = require('../index')

// CREATE
const createRole = async ({ userId, roleId = 3 }) => {
    let role = await User_has_roles.create({
        userId,
        roleId,
    })
    return role
}

// READ
const findRoleIdsByUserId = async (userId) => {
    const roleIds = (
        await User_has_roles.findAll({
            where: {
                userId,
            },
            attributes: ['roleId'],
            raw: true,
        })
    ).map((u) => u.roleId)

    return roleIds
}

const findRoleIdByUserId = async (userId) => {
    const role = await User_has_roles.findOne({
        where: {
            userId,
        },
        attributes: ['roleId'],
    })

    return role?.roleId
}

const updateRole = async ({ userId, roleId }) => {
    console.log(`userId: ${userId}, roleId: ${roleId}`)
    let role = await User_has_roles.update(
        { roleId },
        {
            where: {
                userId,
            },
        },
    )
    return role
}

module.exports = {
    createRole,
    findRoleIdsByUserId,
    findRoleIdByUserId,
    updateRole,
}
