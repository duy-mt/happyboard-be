const { createClient } = require('redis')
const { redis } = require('../../../config')

const client = createClient(redis)

client.on('error', err => console.log('Connect Redis error', err))
client.on('ready', () => { console.log('\x1b[42m%s\x1b[0m', 'Redis: Connect succefully')})

const getRedisInstance = async () => {
    await client.connect()

    return client
}

module.exports = {
    getRedisInstance
}