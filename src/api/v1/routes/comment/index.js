'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth')

const router = express.Router()

router.use(asyncHandler(authentication))

module.exports = router