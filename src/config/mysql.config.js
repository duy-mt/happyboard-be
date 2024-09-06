'use strict'

const dev = {
    host: process.env.DEV_MYSQL_HOST || 'localhost',
    username: process.env.DEV_MYSQL_USER || 'root',
    password: process.env.DEV_MYSQL_PW || '',
    database: process.env.DEV_MYSQL_DB || 'test',
    dialect: 'mysql',
}

const config = {
    dev,
}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
