'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const analysisController = require('../../controllers/analysis.controller')
const { authentication } = require('../../auth')
const { authorize } = require('../../middlewares')

const router = express.Router()

router.use(asyncHandler(authentication))
////////////////////////////////////////
router.get(
    '/new-user',
    authorize(['USR01']),
    asyncHandler(analysisController.getChartNewUsers),
)

router.get(
    '/ideas',
    authorize(['IDE02']),
    asyncHandler(analysisController.getChartIdeas),
)

module.exports = router
