const dev = {
    host: process.env.DEV_REDIS_HOST || 'localhost',
    port: process.env.DEV_REDIS_PORT || '6379',
}

const prod = {
    host: process.env.PROD_REDIS_HOST || 'localhost',
    port: process.env.PROD_REDIS_PORT || '6379',
}

const config = {
    dev, prod
}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]