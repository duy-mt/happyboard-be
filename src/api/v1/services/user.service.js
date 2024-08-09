'use strict'

const { STATUS_USER } = require("../constants")
const { BadRequest } = require("../core/error.response")
const { findAllUsers, updateUserByUserId } = require("../models/repo/user.repo")

class UserService {
    static getAllUsers = async () => {
        return await findAllUsers()
    }

    static updateStatusUser = async ({
        userId, status
    }) => {
        // block, pending, block
        if(!Object.keys(STATUS_USER).includes(status)) throw new BadRequest('Missing status to change or status wrong')
        // Check user isAdmin? if admin -> throw err
        // ...
        const usr = await updateUserByUserId({
            userId, payload: { status }
        })
        console.log(STATUS_USER[status])
        return usr
    }
}

module.exports = UserService