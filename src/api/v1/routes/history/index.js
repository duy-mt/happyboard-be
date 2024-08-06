'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const historyController = require('../../controllers/history.controller')
const { authentication } = require('../../auth')

const router = express.Router()

router.use(asyncHandler(authentication))
////////////////////////////////////////
router.get('', asyncHandler(historyController.getHistories))

module.exports = router