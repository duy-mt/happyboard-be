'use strict'

const { findAllUsers } = require("../models/repo/user.repo")

class UserService {
    static getAllUsers = async () => {
        return await findAllUsers()
    }
}

module.exports = UserService