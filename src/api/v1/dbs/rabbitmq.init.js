const amqp = require('amqplib')
const { rabbitmq } = require('../../../config')

const getRabbitMQInstance = async () => {
    console.log(rabbitmq)
    const connection = await amqp.connect(rabbitmq)

    const channel = await connection.createChannel()

    return {
        connection,
        channel,
    }
}

module.exports = {
    getRabbitMQInstance,
}
