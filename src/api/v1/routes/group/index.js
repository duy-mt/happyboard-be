'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth')
const groupController = require('../../controllers/group.controller')
const { authorize } = require('../../middlewares')
const { uploadMemory } = require('../../dbs/multer.init')

const router = express.Router()

router.use(asyncHandler(authentication))

router.put(
    '/:groupId/avatar',
    uploadMemory.single('file'),
    asyncHandler(groupController.updateAvatarGroup),
)

router.put(
    '/:groupId/background',
    uploadMemory.single('file'),
    asyncHandler(groupController.updateBackgroundGroup),
)

router.get('/byUser', asyncHandler(groupController.getAllGroupsByUserId))
router.get('', asyncHandler(groupController.getAllGroups))
router.post(
    '',
    // authorize(['CAT02']),
    uploadMemory.array('files', 2),
    asyncHandler(groupController.createGroup),
)
router.get('/:groupId', asyncHandler(groupController.getGroupById))
router.put(
    '/:groupId',
    // authorize(['CAT03']),
    asyncHandler(groupController.updateGroup),
)
router.delete(
    '/:groupId',
    // authorize(['CAT04']),
    asyncHandler(groupController.deleteGroup),
)

module.exports = router
