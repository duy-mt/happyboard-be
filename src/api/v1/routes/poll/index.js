'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth')
const pollController = require('../../controllers/poll.controller')
const { authorize } = require('../../middlewares')

const router = express.Router()

router.use(asyncHandler(authentication))

// router.get('', asyncHandler(pollController.getAllCategories))

router.post('/votes', asyncHandler(pollController.createVoteForPoll))

router.get('/options/:id', asyncHandler(pollController.getOptionByPollId))

// router.post(
//     '',
//     authorize(['CAT02']),
//     asyncHandler(pollController.createPoll),
// )
// router.put(
//     '/:pollId',
//     authorize(['CAT03']),
//     asyncHandler(pollController.updatePoll),
// )
// router.delete(
//     '/:pollId',
//     authorize(['CAT04']),
//     asyncHandler(pollController.deletePoll),
// )

module.exports = router
