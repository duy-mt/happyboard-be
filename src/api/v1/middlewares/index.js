'use strict'

const { Forbidden } = require("../core/error.response")
const asyncHandler = require("../helpers/asyncHandler")
const { findPermissionIdByName } = require("../models/repo/permission.repo")
const { findPermissionIdsByRoleIds } = require("../models/repo/role_has_permissions.repo")
const { findUserByUserId } = require("../models/repo/user.repo")
const { findRoleIdsByUserId } = require("../models/repo/user_has_roles.repo")

const authorize = (permission = []) => {
    if (permission.length !== 0) {
        return asyncHandler(async (req, res, next) => {
            // 1. Get user role IDs
            const roleIds = await findRoleIdsByUserId(req.body.userId);

            // 2. Get permissions associated with those role IDs
            const permissionsOfRoles = await findPermissionIdsByRoleIds(roleIds)

            // // 3. Get permission IDs for the specified permissions
            const permissionOfUser = await Promise.all(permission.map(async p => {
                return findPermissionIdByName(p)
            }))
            
            // 4. Check if user has the required permissions
            permissionOfUser.forEach(p => {
                if (!permissionsOfRoles.includes(p)) {
                    throw new Forbidden('You do not have permission to access this resource')
                }
            });
            
            next();
        });
    }
    
    return (req, res, next) => next()
}

module.exports = {
    authorize
}