'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const ideaController = require('../../controllers/idea.controller')
const { authentication } = require('../../auth')

const router = express.Router()

router.get('', asyncHandler(ideaController.getAllIdeas))

router.use(asyncHandler(authentication))

router.get('/:userId', asyncHandler(ideaController.getAllIdeasByUserId))
router.post('/create', asyncHandler(ideaController.createIdea))
router.post('/vote', asyncHandler(ideaController.upVoteCount))

module.exports = router