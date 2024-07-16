'use strict'

const { updateUserByUserId, findUserByUserId } = require("../models/repo/user.repo")
const { removeField } = require("../utils")

class ProfileService {
    static updateProfile = async (prePayload) => {
        const userId = prePayload.userId
        const payload = removeField({
            obj: prePayload,
            field: ['email', 'userId', 'password', 'status']
        })
        const updatedProfile = await updateUserByUserId({
            userId, payload
        })
        return updatedProfile
    }

    static getProfile = async (userId) => {
        const holderUser = await findUserByUserId(userId)
        console.log(holderUser)
        const user = removeField({
            obj: holderUser,
            field: ['password', 'createdAt', 'updatedAt']
        })
        return user
    }
}

module.exports = ProfileService