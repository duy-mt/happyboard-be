'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const accessController = require('../../controllers/access.controller')
const { authentication } = require('../../auth')

const router = express.Router()

router.post('/signup', asyncHandler(accessController.signUp))
router.post('/login', asyncHandler(accessController.login))

router.use(asyncHandler(authentication))

router.post('/logout', asyncHandler(accessController.logout))

module.exports = router