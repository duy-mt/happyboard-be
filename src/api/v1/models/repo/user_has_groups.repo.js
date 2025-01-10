const { includes } = require('lodash')
const { processReturnedData } = require('../../utils')
const { User_has_groups, Group } = require('../index')
const { where } = require('sequelize')
const { Op } = require('sequelize')

// CREATE
const createGroupForUser = async ({ userId, groupId }) => {
    let group = await User_has_groups.create({
        userId,
        groupId,
    })
    return group
}

// READ
const findGroupsByUserId = async (userId) => {
    const groups = await User_has_groups.findAndCountAll({
        where: {
            userId,
            groupId: {
                [Op.ne]: 1,
            },
        },
        attributes: ['groupId'],
        include: [
            { model: Group, as: 'group', attributes: ['name', 'avatar'] },
        ],
        // raw: true,
    })

    return groups
}

const addMemberToGroup = async ({ memberId, groupId }) => {
    // return await User_has_groups.findOrCreate({
    //     where: {
    //         userId: {
    //             [Op.eq]: memberId,
    //         },
    //         groupId: {
    //             [Op.eq]: groupId,
    //         },
    //     },
    //     default: {
    //         userId: memberId,
    //         groupId: groupId,
    //     }
    // })
    return await User_has_groups.create({ userId: memberId, groupId })
}

const leaveGroup = async ({ userId, groupId }) => {
    return User_has_groups.destroy({
        where: {
            userId,
            groupId,
        },
    })
}

const findUserInGroup = async ({ groupId }) => {
    return await User_has_groups.findAll({
        where: {
            groupId: groupId,
        },
    })
}

// const findGroupIdByUserId = async (userId) => {
//     const role = await User_has_groups.findOne({
//         where: {
//             userId,
//         },
//         attributes: ['roleId'],
//     })

//     return role?.roleId
// }

// const updateGroup = async ({ userId, roleId }) => {
//     console.log(`userId: ${userId}, roleId: ${roleId}`)
//     let role = await User_has_groups.update(
//         { roleId },
//         {
//             where: {
//                 userId,
//             },
//         },
//     )
//     return role
// }

module.exports = {
    createGroupForUser,
    findGroupsByUserId,
    addMemberToGroup,
    leaveGroup,
    findUserInGroup
    // findGroupIdsByUserId,
    // findGroupIdByUserId,
    // updateGroup,
}
