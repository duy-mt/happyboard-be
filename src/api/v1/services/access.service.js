'use strict'

const { Conflict, BadRequest, Unauthorized } = require("../core/error.response")
const { createNewToken, updatePairToken, removeTokenById, findTokenByRefreshToken, removeTokenByAccessToken } = require("../models/repo/token.repo")
const { findUserByEmail, createUser } = require("../models/repo/user.repo")
const { 
    createAccessToken, 
    createSecretKey, 
    createRefreshToken, 
    createHash,
    compareHash,
    verifyJWT,
    removeField,
} = require("../utils")

class AccessService {
    static login = async ({ email, password, deviceToken }) => {
        // 1.Check email
        if(!email || !password) throw new BadRequest('Email and password are required')
        const { password: foundPW, user: foundUser } = await findUserByEmail(email)
        if(!foundUser) throw new Conflict('Account does not exist')
        // 2.Match pw
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
        const holderUser = await findUserByEmail(email)
        console.log(holderUser);
        if(holderUser.user) throw new Conflict('Account already exists')
        const hashPW = await createHash(password)
        const newUser = await createUser({
            email, password: hashPW, username
        })

        if(newUser) {
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

    static handleRefreshToken = async ({userId, refreshToken}) => {
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
            refreshToken
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
}

module.exports = AccessService