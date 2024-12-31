'use strict'

const { Group } = require('../index')

const optGroup = {
    attributes: ['name', 'description', 'avatar', 'background'],
}

const createGroup = async ({ name, description, avatar, background }) => {
    const group = await Group.create({
        name,
        description,
        avatar,
        background,
    })

    return group.get(optGroup)
}

// FIND
const getAllGroups = async (options = {}) => {
    const { count: total, rows: groups } = await Group.findAndCountAll({
        ...optGroup,
    })

    return {
        groups,
        total,
    }
}

const getGroupById = async ({ id }) =>
    await Group.findOne({
        where: { id },
        ...optGroup,
    })

const updateGroup = async ({ groupId, payload = {} }) => {
    const updatedData = await Group.update(payload, {
        where: {
            id: groupId,
        },
        ...optGroup,
        raw: true,
    })
    return updatedData
}

const deleteGroup = async (groupId) => {
    const deleted = await Group.destroy({
        where: {
            id: groupId,
        },
    })
    return deleted
}

module.exports = {
    createGroup,
    getAllGroups,
    getGroupById,
    updateGroup,
    deleteGroup,
}
