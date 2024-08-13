'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const ideaController = require('../../controllers/idea.controller')
const { authentication } = require('../../auth')
const { authorize } = require('../../middlewares')

const router = express.Router()

router.use(asyncHandler(authentication))
////////////////////////////////////////
// Admin
router.get('/all', authorize(['IDE02']), asyncHandler(ideaController.getAllIdeas))
router.get('/draft/all', authorize(['IDE02']), asyncHandler(ideaController.getAllDraftIdeas))
router.post('/:ideaId/publish', authorize(['IDE07']), asyncHandler(ideaController.publishIdea))
router.post('/:ideaId/unpublish', authorize(['IDE07']), asyncHandler(ideaController.unPublishIdea))
// End Admin

router.get('/own', asyncHandler(ideaController.getAllOwnIdeas))
router.get('/own/publish', asyncHandler(ideaController.getAllOwnPublishedIdeas))
router.get('/own/hide', asyncHandler(ideaController.getAllOwnHidedIdeas))
router.get('/own/draft', asyncHandler(ideaController.getAllOwnDraftedIdeas))


router.get('', asyncHandler(ideaController.getAllPublishedIdeas))
router.post('', asyncHandler(ideaController.createIdea))
router.post('/drafted', asyncHandler(ideaController.draftIdea))



router.get('/popular', asyncHandler(ideaController.getPopularIdeas))
router.get('/recent', asyncHandler(ideaController.getRecentIdeas))
router.get('/similar', asyncHandler(ideaController.getSimilarIdeas))
router.get('/:ideaId', asyncHandler(ideaController.getIdea))

router.get('/:ideaId', asyncHandler(ideaController.getIdea))
router.put('/:ideaId', asyncHandler(ideaController.updateIdea))
router.delete('/:ideaId', asyncHandler(ideaController.deleteIdea))

// Comment
router.get('/:ideaId/comments', asyncHandler(ideaController.getCommentByIdeaId))
router.post('/:ideaId/comments', asyncHandler(ideaController.createComment))

// Vote
router.post('/:ideaId/up', asyncHandler(ideaController.upVoteCount))
router.post('/:ideaId/down', asyncHandler(ideaController.downVoteCount))
router.delete('/:ideaId/cancel', asyncHandler(ideaController.cancelVote))

module.exports = router