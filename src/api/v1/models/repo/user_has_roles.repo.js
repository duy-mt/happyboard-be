const { User_has_roles } = require('../index')

// READ
const findRoleIdsByUserId = async (userId) => {
    const roleIds = (await User_has_roles.findAll({
        where: {
            userId
        },
        attributes: ['roleId'],
        raw: true
    })).map(u => u.roleId)

    return roleIds
}

module.exports = {
    findRoleIdsByUserId
}