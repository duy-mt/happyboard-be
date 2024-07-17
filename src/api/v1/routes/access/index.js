'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const accessController = require('../../controllers/access.controller')
const { authentication } = require('../../auth')

const router = express.Router()

router.post('/signup', asyncHandler(accessController.signUp))
router.post('/signin', asyncHandler(accessController.login))
router.post('/refresh', asyncHandler(accessController.refreshToken))

router.use(asyncHandler(authentication))

router.post('/logout', asyncHandler(accessController.logout))

module.exports = router