'use strict'

const { BadRequest } = require('../core/error.response')
const {
    updateUserByUserId,
    findUserByUserId,
} = require('../models/repo/user.repo')
const { removeField } = require('../utils')
const redisService = require('./redis.service')
const UploadService = require('./upload.service')

class ProfileService {
    static keyRedis = (userId) => {
        let prefix = 'user'
        return `${prefix}:${userId}:profile`
    }
    static updateProfile = async ({ file, userId, body }) => {
        let url = ''
        if (file) {
            let image = await UploadService.uploadFromBuffer({
                file,
                folderName: 'user/avatar',
                filename: userId,
            })
            url = image.url
        }

        body.avatar = url
        const payload = removeField({
            obj: body,
            field: ['email', 'userId', 'password', 'status'],
        })
        const updatedProfile = await updateUserByUserId({
            userId,
            payload,
        })
        if (!updatedProfile) throw new BadRequest('Update Profile Failed')
        await redisService.delete({
            key: this.keyRedis(userId),
        })
        return await this.getProfile(userId)
    }

    static getProfile = async (userId) => {
        let redisData = await redisService.get({
            key: this.keyRedis(userId),
        })
        if (redisData) return redisData
        const holderUser = await findUserByUserId(userId)
        console.log(holderUser)
        const user = removeField({
            obj: holderUser,
            field: ['password', 'createdAt', 'updatedAt'],
        })
        await redisService.setEx({
            key: this.keyRedis(userId),
            duration: 60 * 60 * 24,
            data: user,
        })
        return user
    }
}

module.exports = ProfileService
