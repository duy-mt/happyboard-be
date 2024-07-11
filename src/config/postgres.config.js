'use strict'

const dev = {
    host: process.env.DEV_POSTGRES_HOST || 'db-test-deploy.cvckwc2oqptq.ap-southeast-1.rds.amazonaws.com',
    username: process.env.DEV_POSTGRES_USER || 'postgres',
    password: process.env.DEV_POSTGRES_PW || '12345678',
    database: process.env.DEV_POSTGRES_DB || 'postgres',
    port: process.env.DEV_POSTGRES_PORT || '5432',
    dialect: 'postgres',
}

const prod = {
    host: process.env.PROD_POSTGRES_HOST || 'localhost',
    username: process.env.PROD_POSTGRES_USER || 'postgres',
    password: process.env.PROD_POSTGRES_PW || 'rootpass',
    database: process.env.PROD_POSTGRES_DB || 'hb',
    port: process.env.DEV_POSTGRES_PORT || '5455',
    dialect: 'postgres',
}

const config = {
    dev, prod
}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
