'use strict'
const { processReturnedData, removeField } = require('../../utils')
const { User, User_has_groups, Group, sequelize } = require('../index')
const { Op } = require('sequelize')
const { findUserInGroup } = require('../repo/user_has_groups.repo')

const optUser = {
    attributes: ['id', 'username', 'avatar'],
}

const findAllReceiversNotificationInGroup = async ({ groupId, userId }) => {
    const { count: total, rows: users } = await User.findAndCountAll({
        include: [
            {
                model: Group,
                as: 'groups',
                where: {
                    id: groupId,
                },
                through: {
                    attributes: [],
                },
            },
        ],
        where: {
            id: {
                [Op.ne]: userId,
            },
        },
        ...optUser,
    })

    return { total, users }
}

const findAllUserNotInGroupToAddMember = async ({ groupId }) => {
    const user_has_groups = await findUserInGroup({ groupId })
    const userIds = user_has_groups.map(
        (user_has_group) => user_has_group.userId,
    )
    const { count: total, rows: users } = await User.findAndCountAll({
        where: {
            id: {
                [Op.notIn]: userIds,
            },
        },
        ...optUser,
    })

    return { total, users }
}
// CREATE
const createUser = async ({ email, password, username, avatar = '' }) => {
    try {
        const user = await User.create({
            email,
            password,
            username,
            avatar,
            status: 'active',
        })

        return user.get({ plain: true })
    } catch (error) {
        console.error(`Error creating new user with email: ${email}`, error)
        throw error
    }
}

// READ
const findAllUsers = async ({
    offset,
    limit,
    where,
    sortBy = 'id',
    orderBy = 'DESC',
}) => {
    let attributes = [
        'id',
        'username',
        'email',
        'avatar',
        'phone',
        'status',
        'isOnline',
        'createdAt',
        'updatedAt',
    ]
    let orderBys = ['ASC', 'DESC']
    let sortBys = ['id', 'createdAt', 'updatedAt']

    if (orderBys.indexOf(orderBy) === -1) orderBy = 'DESC'
    if (sortBys.indexOf(sortBy) === -1) sortBy = 'id'

    const { count, rows: users } = await User.findAndCountAll({
        attributes,
        offset,
        limit,
        order: [[sortBy, orderBy]],
        where,
    })

    return {
        users: processReturnedData(users),
        count,
    }
}

const findUserByEmail = async (email) => {
    const user = await User.findOne({
        where: {
            email,
        },
        attributes: [
            'id',
            'email',
            'username',
            'password',
            'avatar',
            'status',
            'isOnline',
        ],
        raw: true,
    })

    return {
        password: user?.password,
        user: user
            ? removeField({
                  obj: user,
                  field: ['password'],
              })
            : null,
    }
}

const findUserByUserId = async (userId) => {
    const user = await User.findByPk(userId)
    return processReturnedData(user)
}

const findUsersByUserIds = async (userIds = []) => {
    let users = await Promise.all(
        userIds.map((userId) =>
            User.findByPk(userId, {
                attributes: [
                    'id',
                    'username',
                    'email',
                    'avatar',
                    'phone',
                    'status',
                    'isOnline',
                    'createdAt',
                    'updatedAt',
                ],
            }),
        ),
    )

    return processReturnedData(users)
}

// UPDATE
const updateUserByUserId = async ({ userId, payload = {} }) => {
    if (Object.keys(payload).length === 0) return 1
    const [updatedUser] = await User.update(payload, {
        where: {
            id: userId,
        },
        attributes: [
            'id',
            'email',
            'username',
            'password',
            'avatar',
            'status',
            'isOnline',
        ],
        raw: true,
    })
    return updatedUser
}

// DELETE

module.exports = {
    createUser,
    findAllUsers,
    findUserByEmail,
    findUserByUserId,
    updateUserByUserId,
    findUsersByUserIds,
    findAllReceiversNotificationInGroup,
    findAllUserNotInGroupToAddMember,
}
