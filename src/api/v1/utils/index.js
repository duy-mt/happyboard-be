'use strict'

const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// BEGIN AUTH

const createAccessToken = async ({
    payload, secretKey
}) => {
    const accessToken = JWT.sign(payload, secretKey, {
        algorithm: 'HS256',
        expiresIn: '1d'
    })
    return accessToken
}

const createRefreshToken = async ({
    payload, secretKey
}) => {
    const refreshToken = JWT.sign(payload, secretKey, {
        algorithm: 'HS256',
        expiresIn: '90d'
    })

    return refreshToken
}

const createSecretKey = () => {
    return process.env.DEV_SECRET_KEY
}

const createHash = (input) => {
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(input, salt)
    return hash
}

const compareHash = (input1, input2) => {
    return bcrypt.compareSync(input1, input2)
}

const verifyJWT = async ({token, secretKey}) => {
    try {
        return await JWT.verify(token, secretKey)
    } catch (err) {
        return null
    }
}


// END AUTH

module.exports = {
    createAccessToken,
    createRefreshToken,
    createSecretKey,
    createHash,
    compareHash,
    verifyJWT
}