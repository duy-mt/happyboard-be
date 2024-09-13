'use strict'

const { OK, Created } = require('../core/success.response')
const NotificationService = require('../services/notification.service')

class NotificationController {
    getAllNotifications = async (req, res, next) => {
        new OK({
            message: 'Get all notification successfully!',
            data: await NotificationService.getAllNotifications({
                userId: req.body.userId,
                limit: req.query?.limit,
                page: req.query?.page,
            }),
        }).send(res)
    }

    openNotification = async (req, res, next) => {
        new OK({
            message: 'Open notification successfully!',
            data: await NotificationService.updateStatusNotification({
                notificationId: req.params?.notificationId,
            }),
        }).send(res)
    }

    getUnreadNotifications = async (req, res, next) => {
        new OK({
            message: 'Get unread notification successfully!',
            data: await NotificationService.getUnreadNotifications({
                userId: req.body.userId,
                limit: req.query?.limit,
                page: req.query?.page,
            }),
        }).send(res)
    }
}

module.exports = new NotificationController()
