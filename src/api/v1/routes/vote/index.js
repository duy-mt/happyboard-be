'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const voteController = require('../../controllers/vote.controller')
const { authentication } = require('../../auth')

const router = express.Router()

router.use(asyncHandler(authentication))

module.exports = router