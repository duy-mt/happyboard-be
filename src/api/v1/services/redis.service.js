const { getRedisInstance } = require('../dbs/redis.init')

class RedisService {
    constructor() {
        this.run()
    }

    run = async () => {
        this.client = await getRedisInstance()
    }

    LSET = async ({
        key, value
    }) => {
        return await this.client.lPush(key, value)
    }

    LRANGE = async ({
        key, start = 0, stop = -1
    }) => {
        const l = await this.client.lRange(key, start, stop)
        return l
    }
}

module.exports = new RedisService()
/*
    SET
    001: {
        info: {
            username
            email
            role
            permission
        },
        recentIdea: [1, 2, 3, 4, 5]
    }
*/