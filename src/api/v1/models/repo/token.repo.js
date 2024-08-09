'use strict'

const { Token } = require('../index')

const createNewToken = async ({
    userId, accessToken, refreshToken
}) => {
    const token = await Token.create({ 
        userId,
        accessToken,
        refreshToken
    })

    return token?.dataValues
}

const updatePairToken = async ({
    userId, accessToken, refreshToken, deviceToken
}) => {
    const [token, isCreated] = await Token.findOrCreate(
        { 
            where: { userId, refreshToken },
            defaults: {
                accessToken,
                deviceToken
            } 
        },    
    )

    if(!isCreated) token.update({
        accessToken
    })

    return token?.dataValues
} 

// FIND
const findAccessKeyByUserId = async (userId) => {
    const tokens = await Token.findAll({
        where: {
            userId
        },
        attributes: ['accessToken'],
        raw: true
    })
    return tokens
}

const findTokenByRefreshToken = async (refreshToken) => {
    const token = await Token.findOne({
        where: {
            refreshToken
        }
    })

    return token?.dataValues
}

// DELETE
const removeTokenById = async (id) => {
    return await Token.destroy({
        where: {
            id
        },
    })
}

const removeTokenByAccessToken = async ({accessToken}) => {
    return await Token.destroy({
        where: {
            accessToken
        },
    })
}

module.exports = {
    createNewToken,
    updatePairToken,
    findAccessKeyByUserId,
    removeTokenById,
    findTokenByRefreshToken,
    removeTokenByAccessToken
}