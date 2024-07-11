'use strict'

const { Token } = require('../index')

const createNewToken = async ({
    userId, accessToken, refreshToken
}) => {
    return await Token.create({ 
        userId,
        accessToken,
        refreshToken
    })
}

const updatePairToken = async ({
    userId, accessToken, refreshToken
}) => {
    return await Token.update(
        { 
            accessToken,
            refreshToken
        },
        { where: { userId } }
    )
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