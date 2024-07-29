const amqp = require('amqplib')
const { rabbitmq } = require('../../../config')

let instance

const connect = async () => {
    instance = await amqp.connect(rabbitmq)
}

connect()
.then(() => console.log('\x1b[42m%s\x1b[0m', 'RabbitMQ: Connect successfully'))
.catch(err => console.log('RabbitMQ: Connect failed ', err))

const getInstanceMQ = async () => {
    return instance
}

module.exports = {
    getInstanceMQ
}