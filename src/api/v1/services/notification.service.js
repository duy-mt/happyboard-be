'use strict'

const { getAllNotificationsByUserId, updateStatusNotification, getUnreadNotificationsByUserId } = require("../models/repo/notification.repo")

class NotificationService {
    static getAllNotifications = async ({
        userId, page = 1, limit = 10
    }) => {
        let offset = (page - 1) * limit
        return await getAllNotificationsByUserId({
            userId, offset, limit
        })
    }

    static updateStatusNotification = async ({
        notificationId, status = 1 // OPENED
    }) => {
        await updateStatusNotification({
            id: notificationId,
            status
        })
        return 1
    } 

    static getUnreadNotifications = async ({
        userId, page = 1, limit = 10, status = 0 //UNREAD
    }) => {
        let offset = (page - 1) * limit
        return await getUnreadNotificationsByUserId({
            userId, offset, limit, status
        })
    }
}

module.exports = NotificationService