'use strict'

const { Notification, User } = require('../index')

// CONFIG
const queryConfig = {
    order: [
        ['createdAt', 'DESC'],
    ],
    include: [
        {
            model: User,
            as: 'fromUser',
            attributes: ['id', 'username', 'email', 'avatar']
        }
    ],
    attributes: ['id', 'type', 'target', 'status', 'createdAt']
}

// CREATE
const createNotification = async ({
    type, from, to, target
}) => {
    return await Notification.create({
        type, from, to, target, status: 0
    })
}

// READ
const getAllNotificationsByUserId = async ({
    userId, offset, limit
}) => {
    return await Notification.findAll({
        offset,
        limit,
        ...queryConfig,
        where: {
            to: userId || '3'
        }
    })
}

// UPDATE
const updateStatusNotification = async ({
    id, status // OPENED
}) => {
    await Notification.update({
        status 
    }, {
        where: {
            id: id
        }
    })
}

module.exports = {
    createNotification,
    getAllNotificationsByUserId,
    updateStatusNotification
}