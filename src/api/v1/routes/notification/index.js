'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth')
const notificationController = require('../../controllers/notification.controller')

const router = express.Router()

router.use(asyncHandler(authentication))
////////////////////////////////////////
router.get('', asyncHandler(notificationController.getAllNotifications))
router.get('/unread', asyncHandler(notificationController.getUnreadNotifications))
router.post('/:notificationId', asyncHandler(notificationController.openNotification))


module.exports = router