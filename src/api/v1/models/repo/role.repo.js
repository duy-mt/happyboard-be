'use strict'

const { processReturnedData, removeField } = require('../../utils')
const { Role } = require('../index')

const findRoleById = async (roleId) => {
    let role = await Role.findOne({
        where: {
            id: roleId
        },
        attributes: ['id', 'name', 'description']
    })
    return processReturnedData(role)
}

module.exports = {
    findRoleById
}
