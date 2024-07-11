'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const commentController = require('../../controllers/comment.controller')
const { authentication } = require('../../auth')

const router = express.Router()

// router.get()

router.use(asyncHandler(authentication))

module.exports = router