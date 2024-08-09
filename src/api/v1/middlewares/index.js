'use strict'

const { Forbidden } = require("../core/error.response")
const asyncHandler = require("../helpers/asyncHandler")
const { findPermissionIdByName } = require("../models/repo/permission.repo")
const { findPermissionIdsByRoleIds } = require("../models/repo/role_has_permissions.repo")
const { findUserByUserId } = require("../models/repo/user.repo")
const { findPermissionsByUserId } = require("../models/repo/user_has_permissions.repo")
const { findRoleIdsByUserId } = require("../models/repo/user_has_roles.repo")

const authorize = (permission = []) => {
    if (permission.length !== 0) {
        return asyncHandler(async (req, res, next) => {

            const APIPermission = await Promise.all(permission.map(async p => {
                return findPermissionIdByName(p)
            }))

            // 1. Get user role IDs
            const roleIds = await findRoleIdsByUserId(req.body.userId)

            // 2. Permissions of roleIds
            const permissionsOfRoles = await findPermissionIdsByRoleIds(roleIds)

            // 3. Check permission time 1
            let missingPermission = []
            APIPermission.forEach(p => {
                if(!permissionsOfRoles.includes(p)) missingPermission.push(p)
            })
            if(missingPermission.length === 0) {
                console.log('✅ Allow user access resource!!!')
            } else {
                const permissionsOfUser = await findPermissionsByUserId(req.body.userId)
                missingPermission.forEach(p => {
                    if(permissionsOfUser.includes(p)) missingPermission.pop(p)
                })
                if(missingPermission.length === 0) console.log('✅ Allow user access resource!!!')
                else {
                    console.log('❌ User do not have permission to access this resource!!!')
                    throw new Forbidden('You do not have permission to access this resource')
                }
            }
            
            next();
        })
    }
    
    return (req, res, next) => next()
}

module.exports = {
    authorize
}