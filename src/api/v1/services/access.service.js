'use strict'

const { Conflict, BadRequest, Unauthorized } = require("../core/error.response")
const { createNewToken, updatePairToken, removeTokenById, findTokenByRefreshToken } = require("../models/repo/token.repo")
const { findUserByEmail, createUser } = require("../models/repo/user.repo")
const { 
    createAccessToken, 
    createSecretKey, 
    createRefreshToken, 
    createHash,
    compareHash,
     
} = require("../utils")

class AccessService {
    static login = async ({ email, password, refreshToken = null }) => {
        // 1.Check email
        if(!email || !password) throw new BadRequest('Email and password are required')
        const foundUser = await findUserByEmail(email)
        if(!foundUser) throw new Conflict('Account does not exist')
        // 2.Match pw
        const isPw = await compareHash(password, foundUser.password)
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
            refreshToken: newRefreshToken
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
        email, password, firstName, lastName
    }) => {
        const holderUser = await findUserByEmail(email)
        if(holderUser) throw new Conflict('Account already exists')

        const hashPW = await createHash(password)
        const newUser = await createUser({
            email, password: hashPW, firstName, lastName
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
            console.log(`user`,newUser);
            console.log(`access`,accessToken);
            return {
                user: newUser,
                tokens: {
                    accessToken,
                    refreshToken
                }
            }
        }
        return null
    }

    static logout = async (token) => {
        const delToken = await removeTokenById(token.id)
        return delToken
    }

    static handleRefreshToken = async ( refreshToken ) => {
        const holderToken = await findTokenByRefreshToken(refreshToken)
    }
}

module.exports = AccessService