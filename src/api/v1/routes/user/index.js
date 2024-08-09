'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const userController = require('../../controllers/user.controller')
const { authentication } = require('../../auth')
const { authorize } = require('../../middlewares')

const router = express.Router()

router.use(asyncHandler(authentication))
////////////////////////////////////////
router.get('', authorize(['USR01']), asyncHandler(userController.getAllUsers))
router.put('/status', authorize(['USR06']), asyncHandler(userController.updateStatusUser))

module.exports = router