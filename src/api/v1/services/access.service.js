'use strict'

const { Conflict, BadRequest } = require('../core/error.response')
const {
    updatePairToken,
    findTokenByRefreshToken,
    removeTokenByAccessToken,
    updateDeviceToken,
} = require('../models/repo/token.repo')
const {
    findUserByEmail,
    createUser,
    updateUserByUserId,
    findUserByUserId,
} = require('../models/repo/user.repo')
const { createRole } = require('../models/repo/user_has_roles.repo')
const { htmlForgotPW } = require('../template')
const {
    createSecretKey,
    createHash,
    compareHash,
    verifyJWT,
    removeField,
    generateToken,
} = require('../utils')
const MailerService = require('./mailer.service')
const redisService = require('./redis.service')

class AccessService {
    static login = async ({ email, password, deviceToken }) => {
        // 1.Check email
        ;[email, password] = this.validateInput({ email, password })

        const { password: foundPW, user: foundUser } =
            await findUserByEmail(email)
        if (!foundUser) throw new Conflict('Account does not exist')
        // 2.Match status pw

        if (foundUser.status === 'block')
            throw new BadRequest('Account is blocked')

        const isPw = await compareHash(password, foundPW)
        if (!isPw) throw new BadRequest('Password is incorrect')

        let user = removeField({
            obj: foundUser,
            field: ['isOnline', 'password', 'createdAt', 'updatedAt'],
        })

        let tokens = await this.saveToken({
            userId: user.id,
            email: email,
        })

        // Update device token
        if (deviceToken)
            await this.saveDeviceToken({
                accessToken: tokens.accessToken,
                deviceToken,
            })

        return {
            user,
            tokens,
        }
    }

    static signUp = async ({ email, password, username }) => {
        ;[email, password, username] = this.validateInput({
            email,
            password,
            username,
        })

        // Validate email
        let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        let isEmail = regexEmail.test(email)
        if (!isEmail) throw new BadRequest('Email is invalid')

        // Validate password
        if (password.length < 8)
            throw new BadRequest('Password must be at least 8 characters')

        // Find user
        const holderUser = await findUserByEmail(email)
        if (holderUser.user) throw new Conflict('Account already exists')

        const hashPW = await createHash(password)
        const newUser = await createUser({
            email,
            password: hashPW,
            username,
        })

        if (!newUser) throw new BadRequest('Create account failed')
        let user = removeField({
            obj: newUser,
            field: ['isOnline', 'password', 'createdAt', 'updatedAt'],
        })
        // Add role user
        await createRole({
            userId: user.id,
        })

        let tokens = await this.saveToken({
            userId: user.id,
            email: email,
        })

        return {
            user,
            tokens,
        }
    }

    static logout = async ({ accessToken }) => {
        const delToken = await removeTokenByAccessToken({ accessToken })
        return delToken
    }

    static handleRefreshToken = async ({ userId, refreshToken }) => {
        if (!refreshToken)
            throw new BadRequest('Wrong infomation. Relogin please')

        // 1. Check refreshToken exists in db
        const holderToken = await findTokenByRefreshToken(refreshToken)

        if (!holderToken)
            throw new BadRequest('Wrong infomation. Relogin please')

        // 2. Decode
        const { userId: id, email } = await verifyJWT({
            token: refreshToken,
            secretKey: createSecretKey(),
        })

        if (id != userId)
            throw new BadRequest('Wrong infomation. Relogin please')

        const payload = {
            userId,
            email,
        }

        const accessToken = await generateToken({
            payload,
            secretKey: createSecretKey(),
            expireTime: '1h',
        })

        const token = await updatePairToken({
            userId,
            accessToken,
            refreshToken,
        })

        if (!token) throw new BadRequest('Wrong infomation. Relogin please')
        return {
            accessToken: token.accessToken,
        }
    }

    static signUpWithGoogle = async ({ user, deviceToken }) => {
        const email = user.emails[0].value
        const username = email.split('@')[0]
        const password = 'password123'
        const avatar = user.photos[0].value

        const { user: foundUser } = await findUserByEmail(email)
        if (foundUser?.status === 'block')
            throw new BadRequest('Account is blocked')
        if (foundUser) {
            let tokens = await this.saveToken({
                userId: foundUser.id,
                email,
            })
            if (deviceToken)
                await this.saveDeviceToken({
                    accessToken: tokens.accessToken,
                    deviceToken,
                })

            return {
                user: foundUser,
                tokens,
            }
        } else {
            const hashPW = await createHash(password)
            const newUser = await createUser({
                email,
                password: hashPW,
                username,
                avatar,
            })

            if (!newUser) throw new BadRequest('Create account failed')

            await createRole({
                userId: newUser.id,
            })

            let tokens = await this.saveToken({
                userId: newUser.id,
                email: email,
            })

            return {
                user,
                tokens,
            }
        }
    }

    static forgotPW = async ({ email }) => {
        ;[email] = this.validateInput({ email })
        if (!email) throw new BadRequest('Email is required!')
        let { user } = await findUserByEmail(email)
        if (!user) throw new BadRequest('Account is not exist!')

        let info = {
            email,
            userId: user.id,
            time: Date.now(),
        }

        // Save info in redis (expireTime: 1d)

        // Gen token
        let token = await generateToken({
            payload: info,
            secretKey: createSecretKey(),
            expireTime: '2h',
        })

        await redisService.setEx({
            key: `tokenForgotPassword:${user.id}`,
            duration: 2 * 60 * 60,
            data: token,
        })

        let rs = await MailerService.sendMail({
            toEmail: email,
            subject: '[HappyBoard]: Reset your password at HappyBoard',
            text: 'Email Verification',
            html: await htmlForgotPW({
                email,
                token,
            }),
        })

        return rs
    }

    static changePW = async ({ new_password, token }) => {
        // 1. Validate Token
        let decode = await this.verifyToken({
            token,
            secretKey: createSecretKey(),
        })
        if (!decode) throw new BadRequest('Invalid token')
        let userId = decode.userId

        let tokenRedisSaved = await redisService.get({
            key: `tokenForgotPassword:${userId}`,
        })
        if (tokenRedisSaved !== token) throw new BadRequest('Invalid token')

        if (!new_password) throw new BadRequest('New password is required')
        let result = await updateUserByUserId({
            userId,
            payload: {
                password: createHash(new_password),
            },
        })
        if (!result) throw new BadRequest('Update password failed')
        await redisService.delete({ key: `tokenForgotPassword:${userId}` })
        return result
    }

    static updatePW = async ({ userId, old_password, new_password }) => {
        new_password = new_password.trim()
        if (!old_password || !new_password)
            throw new BadRequest('Old password and new password are required')
        let userHolder = await findUserByUserId(userId)
        if (!userHolder) throw new BadRequest('Account is not exist')
        let foundPW = userHolder.password
        // Check pw
        const isPw = await compareHash(old_password, foundPW)
        if (!isPw) throw new BadRequest('Password is incorrect')

        let result = await updateUserByUserId({
            userId,
            payload: {
                password: createHash(new_password),
            },
        })
        if (!result) throw new BadRequest('Update password failed')
        return result
    }

    // Component
    static verifyToken = async ({ token, secretKey }) => {
        try {
            const decode = await verifyJWT({ token, secretKey })
            return decode
        } catch (error) {
            return null
        }
    }

    static validateToken = async ({ token }) => {
        let decode = await this.verifyToken({
            token,
            secretKey: createSecretKey(),
        })
        if (!decode) throw new BadRequest('Invalid token')
        return 1
    }

    static saveToken = async ({ userId, email }) => {
        const secretKey = createSecretKey()

        const payload = {
            userId,
            email,
        }

        const accessToken = await generateToken({
            payload,
            secretKey,
            expireTime: '1h',
        })

        const refreshToken = await generateToken({
            payload,
            secretKey,
            expireTime: '90d',
        })

        await updatePairToken({
            userId,
            accessToken,
            refreshToken,
        })

        return {
            accessToken,
            refreshToken,
        }
    }

    static saveDeviceToken = async ({ accessToken, deviceToken }) => {
        await updateDeviceToken({ accessToken, deviceToken })
    }

    static validateInput = (input) => {
        let output = Object.keys(input).map((key) => {
            if (!input[key]) throw new BadRequest(`Missing ${key}`)
            let res = input[key].trim()
            if (!res) throw new BadRequest(`Missing ${key}`)
            return res
        })
        return output
    }
}

module.exports = AccessService
