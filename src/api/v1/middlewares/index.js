'use strict'

const { Forbidden } = require('../core/error.response')
const asyncHandler = require('../helpers/asyncHandler')
const { findPermissionIdByName } = require('../models/repo/permission.repo')
const {
    findPermissionIdsByRoleIds,
    findPermissionIdsByRoleId,
} = require('../models/repo/role_has_permissions.repo')
const { findUserByUserId } = require('../models/repo/user.repo')
const {
    findPermissionsByUserId,
} = require('../models/repo/user_has_permissions.repo')
const { findRoleIdsByUserId } = require('../models/repo/user_has_roles.repo')
const redisService = require('../services/redis.service')

const authorize = (permission = []) => {
    if (permission.length !== 0) {
        return asyncHandler(async (req, res, next) => {
            const APIPermission = await Promise.all(
                permission.map(async (p) => {
                    let permissionId = await redisService.get({
                        key: `server:permissions:${p}`,
                    })
                    if (!permissionId) {
                        permissionId = await findPermissionIdByName(p)
                        await redisService.setEx({
                            key: `server:permissions:${p}`,
                            data: permissionId,
                        })
                    }
                    return permissionId
                }),
            )

            // 1. Get user role IDs
            let roleId = await redisService.get({
                key: `user:${req.body.userId}:role`,
            })
            if (!roleId) {
                roleId = await findRoleIdsByUserId(req.body.userId)
                await redisService.setEx({
                    key: `user:${req.body.userId}:role`,
                    data: roleId,
                })
            }
            // const roleIds = await findRoleIdsByUserId(req.body.userId)

            // 2. Permissions of roleIds
            let permissionsOfRole = await redisService.get({
                key: `server:role:${roleId}`,
            })
            if (!permissionsOfRole) {
                permissionsOfRole = await findPermissionIdsByRoleId(roleId)
                await redisService.setEx({
                    key: `server:role:${roleId}`,
                    data: permissionsOfRole,
                })
            }
            // 3. Check permission time 1
            let missingPermission = []
            APIPermission.forEach((p) => {
                if (!permissionsOfRole.includes(p)) missingPermission.push(p)
            })
            if (missingPermission.length === 0) {
                console.log('✅ Allow user access resource!!!')
            } else {
                const permissionsOfUser = await findPermissionsByUserId(
                    req.body.userId,
                )
                missingPermission.forEach((p) => {
                    if (permissionsOfUser.includes(p)) missingPermission.pop(p)
                })
                if (missingPermission.length === 0)
                    console.log('✅ Allow user access resource!!!')
                else {
                    console.log(
                        '❌ User do not have permission to access this resource!!!',
                    )
                    throw new Forbidden(
                        'You do not have permission to access this resource',
                    )
                }
            }

            next()
        })
    }

    return (req, res, next) => next()
}

module.exports = {
    authorize,
}
