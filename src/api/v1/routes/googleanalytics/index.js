'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth')
const { authorize } = require('../../middlewares')
const GoogleAnalyticsController = require('../../controllers/googleanalytics.controller')

const router = express.Router()

router.use(asyncHandler(authentication))

router.get(
    '/views',
    authorize(['IDE02']),
    asyncHandler(GoogleAnalyticsController.getViewsByDay),
)
router.get(
    '/events',
    authorize(['IDE02']),
    asyncHandler(GoogleAnalyticsController.getEventsByDay),
)

module.exports = router
