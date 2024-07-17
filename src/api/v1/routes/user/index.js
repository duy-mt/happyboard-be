'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const userController = require('../../controllers/user.controller')
const { authentication } = require('../../auth')
const { authorize } = require('../../middlewares')

const router = express.Router()

router.use(asyncHandler(authentication))
////////////////////////////////////////
router.get('', authorize(['read all users']), asyncHandler(userController.getAllUsers))

module.exports = router