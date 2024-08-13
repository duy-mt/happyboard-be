'use strict'

const { processReturnedData } = require('../../utils');
const { Permission } = require('../index')

const findPermissionIdByName = async (name) => {
    console.log(name);
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
            id: ids
        },
        attributes: ['id', 'name', 'description']
    })
    return processReturnedData(permission)
}

module.exports = {
    findPermissionIdByName,
    findPermissionsByIds
}