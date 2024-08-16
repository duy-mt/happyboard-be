'use strict'

const { Conflict, BadRequest, Unauthorized } = require("../core/error.response")
const { createNewToken, updatePairToken, removeTokenById, findTokenByRefreshToken, removeTokenByAccessToken } = require("../models/repo/token.repo")
const { findUserByEmail, createUser, updateUserByUserId, findUserByUserId } = require("../models/repo/user.repo")
const { createRole } = require("../models/repo/user_has_roles.repo")
const { htmlForgotPW } = require("../template")
const { 
    createAccessToken, 
    createSecretKey, 
    createRefreshToken, 
    createHash,
    compareHash,
    verifyJWT,
    removeField,
    generateToken,
} = require("../utils")
const MailerService = require("./mailer.service")

class AccessService {
    static login = async ({ email, password, deviceToken }) => {
        // 1.Check email
        if(!email || !password) throw new BadRequest('Email and password are required')
        const { password: foundPW, user: foundUser } = await findUserByEmail(email)
        if(!foundUser) throw new Conflict('Account does not exist')
        // 2.Match status pw

        if(foundUser.status === 'block') throw new BadRequest('Account is blocked')

        const isPw = await compareHash(password, foundPW)
        if(!isPw) throw new BadRequest('Password is incorrect')

        // 3. Update access token
        const payload = {
            userId: foundUser.id, 
            email,
        }
        const secretKey = createSecretKey()
        const newAccessToken = await createAccessToken({
            payload, secretKey
        })
        const newRefreshToken = await createRefreshToken({
            payload, secretKey
        })

        await updatePairToken({
            userId: foundUser.id,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            deviceToken: deviceToken,
        })

        return {
            user: foundUser,
            tokens: {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            }
        }
    }

    static signUp = async ({
        email, password, username
    }) => {
        if(!email || !password) throw new BadRequest('Missing Email Or Password')
        const holderUser = await findUserByEmail(email)
        console.log(holderUser);
        if(holderUser.user) throw new Conflict('Account already exists')
        const hashPW = await createHash(password)
        const newUser = await createUser({
            email, password: hashPW, username
        })

        if(newUser) {
            // Add role user
            await createRole({
                userId: newUser.id
            })
            
            const payload = {
                userId: newUser.id, 
                email,
            }
            const secretKey = createSecretKey()
            const accessToken = await createAccessToken({
                payload, secretKey
            })
            const refreshToken = await createRefreshToken({
                payload, secretKey
            })
            await createNewToken({
                userId: newUser.id,
                accessToken,
                refreshToken 
            })

            return {
                user: removeField({
                    obj: newUser,
                    field: ['password', 'createdAt', 'updatedAt']
                }),
                tokens: {
                    accessToken,
                    refreshToken
                }
            }
        }
        return null
    }

    static logout = async ({ accessToken }) => {
        // const delToken = await removeTokenById(token.id)
        const delToken = await removeTokenByAccessToken({ accessToken })
        return delToken
    }

    static handleRefreshToken = async ({userId, refreshToken, deviceToken}) => {
        if(!refreshToken) throw new BadRequest('Wrong infomation. Relogin please')

        // 1. Check refreshToken exists in db
        const holderToken = await findTokenByRefreshToken(refreshToken)
        if(!holderToken) throw new BadRequest('Wrong infomation. Relogin please')

        // 2. Decode
        const {
            userId: id, email
        } = await verifyJWT({
            token: refreshToken,
            secretKey: createSecretKey()
        })

        if(id != userId) throw new BadRequest('Wrong infomation. Relogin please')
        const payload = {
            userId, 
            email,
        }

        const accessToken = await createAccessToken({
            payload, secretKey: createSecretKey()
        })

        const token = await updatePairToken({
            userId,
            accessToken,
            refreshToken,
            deviceToken: deviceToken
        })

        if(!token) throw new BadRequest('Wrong infomation. Relogin please')
        return {
            accessToken: token.accessToken
        }
    }

    static signUpWithGoogle = async ({ user, deviceToken = '' }) => {
        const email = user.emails[0].value
        const username = email.split('@')[0]
        const password = 'password123'
        const avatar = user.photos[0].value

        const { user: foundUser } = await findUserByEmail(email)
        if(foundUser.status === 'block') throw new BadRequest('Account is blocked')
        if(foundUser) {
            const payload = {
                userId: foundUser.id, 
                email,
            }
            const secretKey = createSecretKey()
            const newAccessToken = await createAccessToken({
                payload, secretKey
            })
            const newRefreshToken = await createRefreshToken({
                payload, secretKey
            })
    
            await updatePairToken({
                userId: foundUser.id,
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                deviceToken: deviceToken,
            })
    
            return {
                user: foundUser,
                tokens: {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken
                }
            }
        } else {
            const hashPW = await createHash(password)
            const newUser = await createUser({
                email, password: hashPW, username, avatar
            })

            if(newUser) {
                await createRole({
                    userId: newUser.id
                })

                const payload = {
                    userId: newUser.id, 
                    email,
                }
                const secretKey = createSecretKey()
                const accessToken = await createAccessToken({
                    payload, secretKey
                })
                const refreshToken = await createRefreshToken({
                    payload, secretKey
                })
                await createNewToken({
                    userId: newUser.id,
                    accessToken,
                    refreshToken 
                })

                return {
                    user: removeField({
                        obj: newUser,
                        field: ['password', 'createdAt', 'updatedAt']
                    }),
                    tokens: {
                        accessToken,
                        refreshToken
                    }
                }
            }   
        }
    }

    static forgotPW = async ({email}) => {
        if(!email) throw new BadRequest('Email is required!') 
        let { user } = await findUserByEmail(email)
        if(!user) throw new BadRequest('Account is not exist!')

        let info = {
            email,
            userId: user.id,
            time: Date.now()
        }

        // Save info in redis (expireTime: 1d)
        
        // Gen token
        let token = await generateToken({
            payload: info,
            secretKey: createSecretKey(),
            expireTime: '2h'
        })
        
        let rs = await MailerService.sendMail({
            toEmail: email, 
            subject: '[HappyBoard]: Reset your password at HappyBoard', 
            text: 'Email Verification',
            html: await htmlForgotPW({
                email, token
            })
        })

        return rs
    }

    static verifyToken = async ({ token, secretKey }) => {
        try {
            const decode = await verifyJWT({token, secretKey})
            return decode
        } catch (error) {
            return null
        }
    }

    static validateToken = async ({ token }) => {
        let decode = await this.verifyToken({ token, secretKey: createSecretKey() })
        if(!decode) throw new BadRequest('Invalid token')
        return 1
    }

    static changePW = async ({ new_password, token }) => {
        // 1. Validate Token
        let decode = await this.verifyToken({ token, secretKey: createSecretKey() })
        if(!decode) throw new BadRequest('Invalid token')  
        let userId = decode.userId
        if(!new_password) throw new BadRequest('New password is required')
        let result = await updateUserByUserId({
            userId,
            payload: {
                password: createHash(new_password)
            }
        })
        if(!result) throw new BadRequest('Update password failed') 
        return result
    } 

    static updatePW = async ({ userId, old_password, new_password }) => {
        new_password = new_password.trim()
        if(!old_password || !new_password) throw new BadRequest('Old password and new password are required')
        let userHolder = await findUserByUserId(userId)
        if(!userHolder) throw new BadRequest('Account is not exist')
        let foundPW = userHolder.password
        // Check pw
        const isPw = await compareHash(old_password, foundPW)
        if(!isPw) throw new BadRequest('Password is incorrect')

        let result = await updateUserByUserId({
            userId,
            payload: {
                password: createHash(new_password)
            }
        })
        if(!result) throw new BadRequest('Update password failed') 
        return result
    }
}

module.exports = AccessService