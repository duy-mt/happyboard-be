const { createClient } = require('redis')
const client = createClient()

client.on('error', err => console.log('Redis Client Error', err))

const getRedisInstance = async () => {
    await client.connect()

    return client
}

module.exports = {
    getRedisInstance
}