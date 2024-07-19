'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const ideaController = require('../../controllers/idea.controller')
const { authentication } = require('../../auth')

const router = express.Router()

router.use(asyncHandler(authentication))
////////////////////////////////////////
router.get('', asyncHandler(ideaController.getAllIdeas))
router.post('', asyncHandler(ideaController.createIdea))

// Publish
router.get('/published', asyncHandler(ideaController.getAllPublisedIdeas))
// router.get('/draft/all', asyncHandler(ideaController.getAllDraftIdeas))

router.get('/popular', asyncHandler(ideaController.getPopularIdeas))
router.get('/recent', asyncHandler(ideaController.getRecentIdeas))
router.get('/similar', asyncHandler(ideaController.getSimilarIdeas))
router.get('/:ideaId', asyncHandler(ideaController.getIdea))
router.post('/:ideaId/publish', asyncHandler(ideaController.publishIdea))
router.post('/:ideaId/unpublish', asyncHandler(ideaController.unPublishIdea))

router.get('/:ideaId', asyncHandler(ideaController.getIdea))

// Comment
router.get('/:ideaId/comments', asyncHandler(ideaController.getCommentByIdeaId))
router.post('/:ideaId/comments', asyncHandler(ideaController.createComment))

// Vote
router.post('/:ideaId/up', asyncHandler(ideaController.upVoteCount))
router.post('/:ideaId/down', asyncHandler(ideaController.downVoteCount))
router.delete('/:ideaId/cancel', asyncHandler(ideaController.cancelVote))

module.exports = router