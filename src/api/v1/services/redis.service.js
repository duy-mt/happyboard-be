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

    ZADD = async ({
        key, value, score
    }) => {
        return await this.client.zAdd(key, {
            score,
            value
        })
    }

    ZRANGE = async ({
        key, start, stop
    }) => {
        return await this.client.zRange(key, start, stop, {'REV': true})
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