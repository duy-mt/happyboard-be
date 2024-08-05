const dev = process.env.DEV_RMQ_PW ? `amqp://${process.env.DEV_RMQ_USER}:${process.env.DEV_RMQ_PW}@${process.env.DEV_RMQ_HOST}` : `amqps://vsdhodqk:hCS5TqgU9PLDub7jVf18NOkQTHegQ_Wk@armadillo.rmq.cloudamqp.com/vsdhodqk`

const prod = `amqps://vsdhodqk:hCS5TqgU9PLDub7jVf18NOkQTHegQ_Wk@armadillo.rmq.cloudamqp.com/vsdhodqk`


const config = {
    dev, prod
}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
