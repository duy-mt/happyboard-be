'use strict'

const express = require('express')

const router = express.Router()

// router.use('/api/v1/vote', require('./vote'))
router.use('/api/v1/profile', require('./profile'))
router.use('/api/v1/ideas', require('./idea'))
router.use('/api/v1/categories', require('./category'))
router.use('/api/v1', require('./access'))

module.exports = router