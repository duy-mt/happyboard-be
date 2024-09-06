'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth')
const uploadController = require('../../controllers/upload.controller')
const { uploadDisk } = require('../../dbs/multer.init')

const router = express.Router()

router.use(asyncHandler(authentication))
////////////////////////////////////////
router.post(
    '/avatar/file',
    uploadDisk.single('file'),
    asyncHandler(uploadController.uploadFileThumb),
)
router.post('/avatar/url', asyncHandler(uploadController.uploadURLThumb))

module.exports = router
