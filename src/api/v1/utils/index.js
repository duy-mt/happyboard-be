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
    return process.env.DEV_SECRET_KEY ? process.env.DEV_SECRET_KEY : `Happyboard`
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
    // const date = new Date(originTime)
    // const day = String(date.getUTCDate()).padStart(2, '0')
    // const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    // const year = date.getUTCFullYear()
    // const hours = String(date.getUTCHours() + 7).padStart(2, '0')
    // const minutes = String(date.getUTCMinutes()).padStart(2, '0')
    // const seconds = String(date.getUTCSeconds()).padStart(2, '0')
    
    // // Format: hh:mm:ss dd/MM/yyyy
    // const formattedDate = `${day}/${month}/${year} at ${hours}:${minutes}`
    // return formattedDate
    return originTime
}


const getModel = (modelName) => {
    return sequelize[modelName]
}

const removeUndefinedObject = obj => {
    console.log(obj)
} 

const removeField = ({
    obj, field = []
}) => {
    Object.keys(obj).forEach(key => {
        if(obj[key] == null) delete obj[key]
        if(field.includes(key)) delete obj[key]
    })

    return obj
}

const processReturnedData = (obj) => {
    if(obj == null) return obj
    obj = JSON.parse(JSON.stringify(obj))

    if(Array.isArray(obj)) {
        obj = obj.map(child => {
            return processReturnedData(child)
        })
    }

    Object.keys(obj).forEach(key => {
        if(obj[key] == null) {
            delete obj[key]
        } else if(Array.isArray(obj[key])) {
            obj[key] = processReturnedData(obj[key])
        }
    })

    // // Convert time
    // if(obj?.createdAt) obj.createdAt = convertTime(obj.createdAt)
    // if(obj?.updatedAt) obj.updatedAt = convertTime(obj.updatedAt)

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

const heartbeatSocket = (wss) => {
    setInterval(() => {
        wss.clients.forEach((ws) => {
            if (!ws.isAlive) {
              console.log('Client is not alive, terminating connection');
              ws.terminate(); 
            }
            ws.isAlive = false;
            ws.ping(); 
        });
    }, 5000)
}

const convetToTimestamp = (time) => {
    let types = {
        m: 60*1000,
        h: 60*60*1000,
        d: 24*60*60*1000,
        M: 30*24*60*60*1000,
        y: 365*24*60*60*1000
    }
    let type = time.slice(-1)
    let amount = parseInt(time.slice(0, -1))
    return types[type] * amount
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
    sortComment,
    heartbeatSocket,
    convetToTimestamp,
}