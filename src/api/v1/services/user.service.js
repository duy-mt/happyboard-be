'use strict'

const { STATUS_USER } = require("../constants")
const { BadRequest } = require("../core/error.response")
const { findPermissionsByIds } = require("../models/repo/permission.repo")
const { findRoleById } = require("../models/repo/role.repo")
const { findPermissionIdsByRoleIds, findPermissionIdsByRoleId } = require("../models/repo/role_has_permissions.repo")
const { findAllUsers, updateUserByUserId, findUserByUserId } = require("../models/repo/user.repo")
const { findPermissionsByUserId, createPermission, deletePermissionOfUser } = require("../models/repo/user_has_permissions.repo")
const { findRoleIdByUserId, updateRole } = require("../models/repo/user_has_roles.repo")
const { htmlBlockUser } = require("../template")
const { removeField } = require("../utils")
const MailerService = require("./mailer.service")

class UserService {
    static getAllUsers = async ({
        page = 1, limit = 10 
    }) => {
        console.log(`page::`, page);
        let offset = (page - 1) * limit
        let { count, users } = await findAllUsers({
            offset, limit
        })
        console.log(users);

        users = await Promise.all(
            users.map(async u => {
                let roleId = u?.id ? await findRoleIdByUserId(u.id) : null
                let role = roleId ? await findRoleById(roleId) : null
                u.role = role
                return u
            })
        )
        const totalPage = Math.ceil(count / limit)
        return {
            totalPage,
            currentPage: page,
            pageSize: limit,
            total: count,
            users,
        }
    }

    static getUser = async ({
        userId
    }) => {
        if(!userId) throw new BadRequest('Missing userId')
        let userHolder = await findUserByUserId(userId)

        if(!userHolder) throw new BadRequest('Not found user')
        userHolder = removeField({
            obj: userHolder,
            field: ['password', 'deletedAt']
        })
        // Get role
        let roleId = await findRoleIdByUserId(userId)
        let role = roleId ? await findRoleById(roleId) : null
        userHolder.roles = role

        // Get addition permission
        let permissionIds = await findPermissionsByUserId(userId)
        let permissions = await findPermissionsByIds(permissionIds)
        userHolder.permissions = permissions

        return userHolder
    }

    static getRole = async ({
        userId
    }) => {
        let roleId = await findRoleIdByUserId(userId)
        let role = await findRoleById(roleId)
        return role
    }

    static updateStatusUser = async ({
        userId, status, adminId
    }) => {

        let userRoleId = await findRoleIdByUserId(userId)
        let adminRoleId = await findRoleIdByUserId(adminId)

        let priorityTarget = userRoleId
        let priorityAdmin = adminRoleId 
        
        if (priorityAdmin > priorityTarget)
            throw new BadRequest('You can\'t assign a status for role higher than your own.')
        // block, pending, block
        if(!Object.keys(STATUS_USER).includes(status)) throw new BadRequest('Missing status to change or status wrong')
        // Check user isAdmin? if admin -> throw err
        // ...
        let updatedRole = await this.updateRole({
            userId,
            roleId: STATUS_USER[status].roleId,
            adminId
        })
        if(updatedRole) {
            const usr = await updateUserByUserId({
                userId, payload: { status }
            })
            if(usr && status === 'block') await this.blockUser({
                userId
            })
            return usr
        }
        return 0
    }

    static updateActivityUser = async ({
        userId, isOnline
    }) => {
        // Check user isAdmin? if admin -> throw err
        // ...
        const usr = await updateUserByUserId({
            userId, payload: { isOnline : isOnline }
        })
        return usr
    }

    static getAllPermissons = async ({
        userId
    }) => {
        // 3. Check exist permission of user
        let permissionIdsOfUser = await findPermissionsByUserId(userId)
        let roleId = await findRoleIdByUserId(userId)
        let permissionIdsOfRole = await findPermissionIdsByRoleId(roleId)

        let perUser = await findPermissionsByIds(permissionIdsOfUser)  
        let perRole = await findPermissionsByIds(permissionIdsOfRole) 

        return {
            permissions: perRole,
            additionPermission: perUser
        }
    }

    static addPermission = async ({
        userId, adminId, permissions = []
    }) => {
        // 1. Check array permission
        if(permissions.length === 0) throw new BadRequest('Can\'t add empty permisisons for user')
        // 2. Check permission of admin
        let permissionIdsOfAdmin = await findPermissionIdsByRoleId(adminId)
        for (let i = 0; i < permissions.length; i++) {
            if (!permissionIdsOfAdmin.includes(permissions[i])) {
                throw new BadRequest(`You can't add permission beyond your own capabilities`)
            }
        }
        // 3. Check exist permission of user
        let permissionIdsOfUser = await findPermissionsByUserId(userId)
        let roleId = await findRoleIdByUserId(userId)
        let permissionIdsOfRole = await findPermissionIdsByRoleId(roleId)

        const existingPermissions = new Set([...permissionIdsOfRole, ...permissionIdsOfUser])

        permissions = permissions.reduce((acc, current) => {
            if (existingPermissions.has(current)) {
                console.log(`Permission ${current} already exists`);
            } else {
                acc.push(current);
            }
            return acc;
        }, [])
        // 4. Add permission
        let result = await createPermission({
            userId,
            permissions
        })

        return 1
    }

    static removePermission = async ({
        userId, adminId, permissions = []
    }) => {
        // 1. Check array permission
        if(permissions.length === 0) throw new BadRequest('Can\'t add empty permisisons for user')
            // 2. Check permission of admin
        let permissionIdsOfAdmin = await findPermissionIdsByRoleId(adminId)
        for (let i = 0; i < permissions.length; i++) {
            if (!permissionIdsOfAdmin.includes(permissions[i])) {
                throw new BadRequest(`You can't remove permission beyond your own capabilities`)
            }
        }
        // Don't remove permission of role
        // let permissionIdsOfUser = await findPermissionsByUserId(userId)
        await deletePermissionOfUser({
            userId,
            permissions
        })
        return 1
    } 

    static updateRole = async ({
        userId, roleId, adminId
    }) => {
        console.log(`userId::${userId} -- type: ${typeof userId}`);
        console.log(`roleId::${roleId} -- type: ${typeof roleId}`);
        console.log(`adminId::${adminId} -- type: ${typeof adminId}`);
        // ID = Priority 
        let user = await findUserByUserId(userId)
        if(!user) throw new BadRequest('Not found user')

        let role = await findRoleById(roleId)
        if(!role) throw new BadRequest('Not found role')

        let adminRoleId = await findRoleIdByUserId(adminId)
    //    let { id: adminRoleId } = await findRoleById(adminId)

        let priorityTarget = roleId
        let priorityAdmin = adminRoleId 
        
        if (priorityAdmin > priorityTarget)
            throw new BadRequest('You can\'t assign a role higher than your own.')

        let rs = await updateRole({
            userId, roleId
        })
        return 1
    }

    // BLOCK USER
    static blockUser = async ({
        userId
    }) => {
        let userHolder = await findUserByUserId(userId)
        console.log(`\x1b[31m...Action when block user ${userHolder.email}\x1b[0m`)
        console.log(`\x1b[31m...May be send email or SMS\x1b[0m`) 
        let email = userHolder.email
        await MailerService.sendMail({
            toEmail: email,
            subject: '[HappyBoard]: Your account has been blocked',
            text: 'Account Blocked Notification',
            html: await htmlBlockUser({
                email
            })
        })
    }
}

module.exports = UserService