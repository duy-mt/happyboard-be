'use strict'

const { getRabbitMQInstance } = require('../dbs/rabbitmq.init')

class MessageQueue {
    static send = async ({ nameExchange, message = {} }) => {
        try {
            const { connection, channel } = await getRabbitMQInstance()

            await channel.assertExchange(nameExchange, 'fanout', {
                durable: false,
                autoDelete: true,
            })

            channel.publish(
                nameExchange,
                '',
                Buffer.from(JSON.stringify(message)),
            )

            console.log(`[x] ${nameExchange} sent: `, message)

            setTimeout(() => {
                connection.close()
            }, 2000)
        } catch (error) {
            console.error(`Error in sendMQ: ${error.message}`)
        }
    }

    static receive = async ({ subscribedExchanges = [] }) => {
        try {
            const { connection, channel } = await getRabbitMQInstance()

            for (let i = 0; i < subscribedExchanges.length; i++) {
                const exchange = subscribedExchanges[i].name

                await channel.assertExchange(exchange, 'fanout', {
                    durable: false,
                    autoDelete: true,
                })

                const { queue } = await channel.assertQueue('', {
                    exclusive: true,
                })

                console.log(
                    `[x] Waiting for messages in ${queue}. To exit press CTRL+C`,
                )

                channel.bindQueue(queue, exchange, '')

                await channel.consume(
                    queue,
                    async (msgBuffer) => {
                        // INSTANCE.EXECUTE(MSG)
                        const msg = JSON.parse(msgBuffer.content.toString())
                        console.log(`[x] Received: `, msg)
                        // await FirebaseService.notification(msg)
                        await subscribedExchanges[i].cb(msg)
                    },
                    {
                        noAck: true,
                    },
                )
            }
        } catch (error) {
            console.error(`Error in receiveMQ: ${error.message}`)
        }
    }

    static sendNotificationToQueue = async ({
        sender,
        senderName,
        receivers,
        endDate,
        target,
        action,
        metadata,
    }) => {
        try {
            const { channel } = await getRabbitMQInstance()

            const ttlExchange = 'poll_notification_ttl'

            // Tính TTL (ms)
            const now = new Date()
            const notifyTime = new Date(endDate) - 60 * 60 * 1000 // Trước 1 giờ
            const ttl = notifyTime - now

            if (ttl <= 0) {
                console.error('TTL <= 0, sending notification immediately.')
                await this.processNotifications({
                    sender,
                    senderName,
                    receivers,
                    target,
                    action,
                    metadata,
                })
                return
            }

            // Tạo message
            const message = {
                sender,
                senderName,
                receivers,
                target,
                action,
                metadata,
            }

            // Gửi message tới TTL Exchange
            channel.publish(
                ttlExchange,
                '',
                Buffer.from(JSON.stringify(message)),
                {
                    expiration: ttl.toString(), // TTL cho message
                    persistent: true,
                },
            )

            console.log(`Message sent to TTL exchange with TTL: ${ttl} ms.`)
        } catch (error) {
            console.error('Error in sendNotificationToQueue:', error.message)
        }
    }

    static processNotifications = async ({
        sender,
        senderName,
        receivers,
        target,
        action,
        metadata,
    }) => {
        try {
            if (!receivers || receivers.length === 0) {
                console.log('No receivers provided.')
                return
            }

            // Tạo message data
            const messageData = {
                sender,
                senderName,
                receivers,
                target,
                action,
                metadata,
            }

            // Gửi message lên RabbitMQ với exchange "poll_notification"
            await MessageQueue.send({
                nameExchange: 'poll_notification',
                message: messageData,
            })

            console.log(
                'Notification message sent to poll_notification exchange successfully.',
            )
        } catch (err) {
            console.error('Error in processNotifications:', err)
        }
    }
}

module.exports = MessageQueue
