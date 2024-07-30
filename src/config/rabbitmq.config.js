const dev = `amqp://${process.env.DEV_RMQ_USER}:${process.env.DEV_RMQ_PW}@${process.env.DEV_RMQ_HOST}`

const prod = `amqp://guest:guest@172.31.33.195`


const config = {
    dev, prod
}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
