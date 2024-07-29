const dev = process.env.DEV_REDIS_URI

const prod = process.env.PROD_REDIS_URI

const config = {
    dev, prod
}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]