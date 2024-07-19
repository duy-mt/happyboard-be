'use strict'

const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const _ = require('lodash')
const sequelize = require('../models')

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
    return await JWT.verify(token, secretKey)
}

// END AUTH

const convertTime = (originTime) => {
    const date = new Date(originTime)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')
    const seconds = String(date.getUTCSeconds()).padStart(2, '0')
    
    // Format: hh:mm:ss dd/MM/yyyy
    const formattedDate = `${day}/${month}/${year} at ${hours}:${minutes}`
    return formattedDate
};


const getModel = (modelName) => {
    return sequelize[modelName]
}

const removeUndefinedObject = obj => {
    console.log(obj)
} 

const removeField = ({
    obj, field
}) => {
    Object.keys(obj).forEach(key => {
        if(obj[key] == null) delete obj[key]
        if(field.includes(key)) delete obj[key]
    })

    return obj
}

const processReturnedData = (obj) => {
    obj = obj?.dataValues || obj

    if(Array.isArray(obj)) {
        obj = obj.map(child => {
            return processReturnedData(child?.dataValues || child)
        })
    }

    Object.keys(obj).forEach(key => {
        if(obj[key] == null) {
            delete obj[key]
        }
        if(Array.isArray(obj[key])) {
            obj[key] = processReturnedData(obj[key])
        } 
    })

    // Convert time
    if(obj?.createdAt) obj.createdAt = convertTime(obj.createdAt)
    if(obj?.updatedAt) obj.updatedAt = convertTime(obj.updatedAt)

    return obj
}

const sortComment = (comments) => {
    const commentMap = {}

    comments.forEach(comment => {
        comment.children = []
        commentMap[comment.id] = comment
    })

    const rootComments = []

    comments.forEach(comment => {
        if (comment.parentId) {
            commentMap[comment.parentId].children.push(comment)
        } else {
            rootComments.push(comment)
        }
    })

    return rootComments
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    createSecretKey,
    createHash,
    compareHash,
    verifyJWT,
    convertTime,
    getModel,
    removeUndefinedObject,
    removeField,
    processReturnedData,
    sortComment
}