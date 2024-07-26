'use strict'

const { connectToRabbitMQ } = require('../dbs/rabbitmq.init')

const sendMessage = async ({
    queueName, msg
}) => {
    const { connection, channel } = await connectToRabbitMQ()

    await channel.assertQueue(queueName)
    await channel.sendToQueue(queueName, new Buffer(msg),
    {
        persistent: true
    })

    connection.on("error", function(err)
    {
        console.log(err);
        setTimeout(connectRabbitMQ, 10000)
    })

    connection.on("close", function()
    {
        console.error("Connection to RabbitQM closed!")
        setTimeout(connectRabbitMQ, 10000)
    })
}

const receiveMessage = async (queueName, callback) => {
    try {
        const { connection, channel } = await connectToRabbitMQ()

        await channel.assertQueue(queueName);

        await channel.consume(queueName, async (message) => {
            try {
                await callback(message.content.toString())
                channel.ack(message)
            } catch (err) {
                console.error("Error processing message:", err);
                channel.nack(message, false, true)
            }
        })

        connection.on("error", (err) => {
            console.error("Connection error:", err);
            setTimeout(connectRabbitMQ, 10000, callback);
        })

        connection.on("close", () => {
            console.error("Connection to RabbitMQ closed!");
            setTimeout(connectRabbitMQ, 10000, callback);
        })

    } catch (err) {
        console.error("Failed to connect to RabbitMQ:", err);
        setTimeout(connectRabbitMQ, 10000, callback);
    }
}

module.exports = {
    sendMessage,
    receiveMessage
}