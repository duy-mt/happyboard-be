const { createClient } = require('redis')
const { redis } = require('../../../config')

class RDB {
    static client;

    static async getClient() {
        if (RDB.client && RDB.client.isOpen) {
            return RDB.client;
        }
        RDB.client = createClient({
            url: redis
        })
        RDB.client.on('error', err => console.log('Connect Redis error', err))
        RDB.client.on('ready', () => { console.log('\x1b[42m%s\x1b[0m', 'Redis: Connect succefully')})
        await RDB.client.connect();

        return RDB.client;
    }
}

module.exports = {
    getRedisInstance: RDB.getClient
}