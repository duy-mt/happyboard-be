'use strict'

require('dotenv').config()

const dev = {
    host:
        process.env.DEV_POSTGRES_HOST,
    username: process.env.DEV_POSTGRES_USER,
    password: process.env.DEV_POSTGRES_PW,
    database: process.env.DEV_POSTGRES_DB,
    port: process.env.DEV_POSTGRES_PORT,
    dialect: 'postgres',
}

const prod = {
    host:
        process.env.PROD_POSTGRES_HOST,
    username: process.env.PROD_POSTGRES_USER,
    password: process.env.PROD_POSTGRES_PW,
    database: process.env.PROD_POSTGRES_DB,
    port: process.env.PROD_POSTGRES_PORT,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
}

const config = {
    dev,
    prod,
}

let env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
