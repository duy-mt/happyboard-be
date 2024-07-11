'use strict'

const express = require('express')

const router = express.Router()

router.use('/api/v1/vote', require('./vote'))
router.use('/api/v1/idea', require('./idea'))
router.use('/api/v1/category', require('./category'))
router.use('/api/v1', require('./access'))

module.exports = router