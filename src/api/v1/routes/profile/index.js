'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const profileController = require('../../controllers/profile.controller')
const { authentication } = require('../../auth')

const router = express.Router()

router.use(asyncHandler(authentication))
////////////////////////////////////////
router.get('', asyncHandler(profileController.getProfile))
router.put('', asyncHandler(profileController.updateProfile))


module.exports = router