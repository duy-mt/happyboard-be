'use strict'

const express = require('express')
const passport = require('passport')

const router = express.Router()

/////////// TEST MESSAGE QUEUE /////////////////
router.post('/test', async (req, res, next) => {
    // TEST MQ
    const MessageQueue = require('../services/rabbitmq.service')
    const msg = req.body

    await MessageQueue.send({
        nameExchange: 'post_notification',
        message: JSON.stringify(msg),
    })
    res.json('Send OK')
})
/////////// END TEST MESSAGE QUEUE /////////////////

// router.use('/api/v1/vote', require('./vote'))
router.use('/api/v1/googleanalytics', require('./googleanalytics'))
router.use('/api/v1/analysis', require('./analysis'))
router.use('/api/v1/hitories', require('./history'))
router.use('/api/v1/users', require('./user'))
router.use('/api/v1/upload', require('./upload'))
router.use('/api/v1/notifications', require('./notification'))
router.use('/api/v1/profile', require('./profile'))
router.use('/api/v1/ideas', require('./idea'))
router.use('/api/v1/comments', require('./comment'))
router.use('/api/v1/categories', require('./category'))
router.use('/api/v1', require('./access'))

module.exports = router
