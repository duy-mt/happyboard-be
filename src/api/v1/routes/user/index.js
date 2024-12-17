'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const userController = require('../../controllers/user.controller')
const { authentication } = require('../../auth')
const { authorize } = require('../../middlewares')

const router = express.Router()

router.get('/websocket/:userId', asyncHandler(userController.getUser))
router.put(
    '/websocket/:userId/online',
    asyncHandler(userController.updateActivityUser),
)

router.use(asyncHandler(authentication))
////////////////////////////////////////
router.get('', authorize(['USR01']), asyncHandler(userController.getAllUsers))
router.get(
    '/latest-online',
    authorize(['USR01']),
    asyncHandler(userController.getLatestUserOnline),
)
router.get(
    '/:userId',
    authorize(['USR01']),
    asyncHandler(userController.getUser),
)

router.get(
    '/:userId/role',
    authorize(['USR01']),
    asyncHandler(userController.getRole),
)
router.put(
    '/:userId/role',
    authorize(['USR07']),
    asyncHandler(userController.addRolesForUser),
)

router.post('/role', asyncHandler(userController.addNewRole))

router.get('/roles/all', asyncHandler(userController.getAllRolesNotForAnUser))

router.put('/role/:roleId', asyncHandler(userController.updateRoleNotForAnUser))

router.delete('/role/:roleId', asyncHandler(userController.deleteRole))

router.post('/permission', asyncHandler(userController.addNewPermission))

router.get('/permissions/all', asyncHandler(userController.getAllPermissonsNotForAnUser))

router.delete('/permission/:permissionId', asyncHandler(userController.deletePermission))

router.put('/permission/:permissionId', asyncHandler(userController.updatePermission))

router.get(
    '/:userId/permissions',
    authorize(['USR01']),
    asyncHandler(userController.getAllPermissons),
)
router.put(
    '/:userId/permissions',
    authorize(['USR07']),
    asyncHandler(userController.addPermissionForUser),
)
router.delete(
    '/:userId/permissions',
    authorize(['USR07']),
    asyncHandler(userController.removePermissions),
)

router.put(
    '/:userId/status',
    authorize(['USR06']),
    asyncHandler(userController.updateStatusUser),
)

router.put(
    '/role/:roleId/permissions',
    asyncHandler(userController.addPermissionsForRole),
)
module.exports = router
