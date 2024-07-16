'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const ideaController = require('../../controllers/idea.controller')
const { authentication } = require('../../auth')

const router = express.Router()

router.use(asyncHandler(authentication))
////////////////////////////////////////
router.get('', asyncHandler(ideaController.getAllIdeas))
router.get('/:ideaId', asyncHandler(ideaController.getIdea))
router.post('', asyncHandler(ideaController.createIdea))

// Publish
// router.post('/:ideaId/publish', asyncHandler(ideaController.publishIdea))
// router.post('/:ideaId/unpublish', asyncHandler(ideaController.unPublishIdea))
// router.get('/published/all', asyncHandler(ideaController.getAllPublisedIdeas))
// router.get('/draft/all', asyncHandler(ideaController.getAllDraftIdeas))

// Comment
router.get('/:ideaId/comments', asyncHandler(ideaController.getCommentByIdeaId))
router.post('/:ideaId/comments', asyncHandler(ideaController.createComment))

// Vote
router.post('/:ideaId/vote', asyncHandler(ideaController.upVoteCount))
router.post('/:ideaId/unvote', asyncHandler(ideaController.downVoteCount))

module.exports = router