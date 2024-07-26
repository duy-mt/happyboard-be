const amqp = require('amqplib')

const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:guest@localhost')
        if(!connection) throw new Error('Connect failed')
            const channel = await connection.createChannel()
        console.log(`Connect RabbitMQ success`)
        return { channel, connection }
    } catch (error) {
        console.log(`Connect RabbitMQ Error:`, error);
    }
}

module.exports = {
    connectToRabbitMQ
}