'use strict'

const { getAllNotificationsByUserId, updateStatusNotification } = require("../models/repo/notification.repo")

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
}

module.exports = NotificationService