'use strict'

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


module.exports = {
    findPermissionIdByName
}