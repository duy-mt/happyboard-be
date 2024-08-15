'use strict'

const { BadRequest } = require("../core/error.response")
const { updateUserByUserId, findUserByUserId } = require("../models/repo/user.repo")
const { removeField } = require("../utils")
const UploadService = require("./upload.service")

class ProfileService {
    static updateProfile = async ({
        file, userId, body
    }) => {
        let url = null
        if(file) {
            let image = await UploadService.uploadFromBuffer({
                file, folderName: 'user/avatar', filename: userId
            })
            url = image.url
        }

        body.avatar = url
        const payload = removeField({
            obj: body,
            field: ['email', 'userId', 'password', 'status']
        })
        const updatedProfile = await updateUserByUserId({
            userId, payload
        })
        if(!updatedProfile) throw new BadRequest('Update Profile Failed')
        return await this.getProfile(userId)
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