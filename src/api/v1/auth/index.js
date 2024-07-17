'use strict'

const { HEADER } = require('../constants')
const { Unauthorized } = require('../core/error.response')
const { findAccessKeyByUserId } = require('../models/repo/token.repo')
const { verifyJWT, createSecretKey } = require('../utils')

const verifyToken = async ({uT, sT, userId}) => {
    if(uT !== sT) return false
    try {
        const decode = await verifyJWT({token:uT, secretKey:createSecretKey()})
        if(decode.userId != userId) return false
        return true
    } catch (error) {
        return false
    }
}

const authentication = async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID]
    if(!userId) throw new Unauthorized('Missing user ID. Please ensure the user ID is provided')
    
    // Add access token to req.body
    req.body.userId = userId
    const token = await findAccessKeyByUserId(userId)

    if(!token) throw new Unauthorized('Not found access token. Please login again to get new token')
    
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new Unauthorized('Missing access token. Please ensure the access token is provided')

    const isValid = await verifyToken({
        uT: accessToken,
        sT: token.accessToken,
        userId
    })

    if(!isValid) {
        const err = new Unauthorized('Expire time')
        err['auto'] = 'yes'
        throw err
    } 
    // throw new Unauthorized('Invalid token. Please login again to get new token')

    // Add access token to req
    req.token = token
    
    return next()
}

module.exports = {
    authentication
}