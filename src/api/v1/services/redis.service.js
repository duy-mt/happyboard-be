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
        key, page = 1, limit = 5, duration = 30 * 24 * 60 * 60 * 1000 // 1 Month
    }) => {
        let offset = (page - 1) * limit
        let timeNow = Date.now()
        let timeStart = timeNow - duration

        let items = await this.client.sendCommand([
            'ZRANGE', 
            key, 
            timeStart.toString(), 
            timeNow.toString(), 
            'BYSCORE',
            'LIMIT',
            offset.toString(),
            limit.toString()
        ])

        return items
    }

    set = async ({}) => {

    }
    
    setEx = async ({}) => {
        
    }

    get = async ({}) => {
        
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