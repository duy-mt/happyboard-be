'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const profileController = require('../../controllers/profile.controller')
const { authentication } = require('../../auth')
const { uploadDisk, uploadMemory } = require('../../dbs/multer.init')

const router = express.Router()

router.use(asyncHandler(authentication))
////////////////////////////////////////
router.get('', asyncHandler(profileController.getProfile))
router.put('', uploadMemory.single('file'), asyncHandler(profileController.updateProfile))


module.exports = router