'use strict'

const dev = {
    host: process.env.DEV_POSTGRES_HOST || 'localhost',
    username: process.env.DEV_POSTGRES_USER || 'postgres',
    password: process.env.DEV_POSTGRES_PW || 'rootpass',
    database: process.env.DEV_POSTGRES_DB || 'hb',
    port: process.env.DEV_POSTGRES_PORT || '5455',
    dialect: 'postgres',
}

const config = {
    dev
}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
