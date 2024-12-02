'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth')
const commentController = require('../../controllers/comment.controller')

const router = express.Router()

router.use(asyncHandler(authentication))

// Reaction
router.post(
    '/:commentId/reaction',
    asyncHandler(commentController.reactionComment),
)
router.post(
    '/:commentId/cancel',
    asyncHandler(commentController.cancelReaction),
)

router.get(
    '',
    asyncHandler(commentController.getMyComments),
)

module.exports = router
