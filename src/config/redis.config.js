const dev = process.env.DEV_REDIS_URI ? process.env.DEV_REDIS_URI : "redis://172.31.33.195:6379"

const prod ="redis://172.31.33.195:6379"

const config = {
    dev, prod
}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
