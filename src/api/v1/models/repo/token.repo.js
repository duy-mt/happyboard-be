'use strict'

const { processReturnedData } = require('../../utils')
const { Token, sequelize } = require('../index')

// UPDATE
const createNewToken = async ({ userId, accessToken, refreshToken }) => {
    const token = await Token.create({
        userId,
        accessToken,
        refreshToken,
    })

    return processReturnedData(token)
}

const updatePairToken = async ({ userId, accessToken, refreshToken }) => {
    const result = await sequelize.transaction(async (t) => {
        const [token, isCreated] = await Token.findOrCreate({
            where: { userId, refreshToken },
            defaults: {
                accessToken,
            },
            transaction: t,
        })

        if (!isCreated) {
            await token.update(
                {
                    accessToken,
                },
                { transaction: t },
            )
        }

        return processReturnedData(token)
    })
    return result
}

const updateDeviceToken = async ({ accessToken, deviceToken }) => {
    let updated = await Token.update(
        {
            deviceToken,
        },
        {
            where: {
                accessToken,
            },
        },
    )
    return updated ? true : false
}

// FIND
const findAccessKeyByUserId = async (userId) => {
    const tokens = await Token.findAll({
        where: {
            userId,
        },
        attributes: ['accessToken'],
    })
    return processReturnedData(tokens)
}

const findTokenByRefreshToken = async (refreshToken) => {
    const token = await Token.findOne({
        where: {
            refreshToken,
        },
    })

    return processReturnedData(token)
}

// DELETE
const removeTokenByAccessToken = async ({ accessToken }) => {
    let res = await Token.destroy({
        where: {
            accessToken,
        },
    })

    return res == 1
}

const removeTokenByUserId = async ({ userId }) => {
    let res = await Token.destroy({
        where: {
            userId,
        },
    })
    return res == 1
}

module.exports = {
    createNewToken,
    updatePairToken,
    findAccessKeyByUserId,
    findTokenByRefreshToken,
    removeTokenByAccessToken,
    removeTokenByUserId,
    updateDeviceToken,
}
