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
    userId, accessToken, refreshToken
}) => {
    const [token, isCreated] = await Token.findOrCreate(
        { 
            where: { userId },
            defaults: {
                accessToken,
                refreshToken
            } 
        },    
    )

    if(!isCreated) token.update({
        accessToken,
        refreshToken
    })

    return token?.dataValues
} 

// FIND
const findAccessKeyByUserId = async (userId) => {
    const token = await Token.findOne({
        where: {
            userId
        }
    })

    return token?.dataValues
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

module.exports = {
    createNewToken,
    updatePairToken,
    findAccessKeyByUserId,
    removeTokenById,
    findTokenByRefreshToken
}