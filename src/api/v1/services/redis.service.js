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
    
    setEx = async ({ key, duration = process.env.CACHE_TIME_LIVE || 3600, data }) => {
        try {
            if(typeof duration == 'number') duration = duration.toString()
            const item = await this.client.setEx(key, duration, JSON.stringify(data))
            console.log(`\x1b[31m...Set Expire Redis:\x1b[0m`, item)
        } catch (err) {
            console.error(`\x1b[31mFailed to set key in Redis:\x1b[0m`, err)
        }
    }
    
    get = async ({ key }) => {
        try {
            const data = await this.client.get(key)
            return data ? JSON.parse(data) : null
        } catch (err) {
            console.error(`\x1b[31mFailed to get key from Redis:\x1b[0m`, err)
            return null
        }
    }

    mget = async ({ keys }) => {
        const data = await this.client.mget(keys)
        return data.map(item => (item ? JSON.parse(item) : null))
    }
    
    
    delete = async ({ key }) => {
        try {
            const result = await this.client.del(key)
            if (result === 1) {
                console.log(`\x1b[31mKey deleted from Redis:\x1b[0m`, key)
            } else {
                console.log(`\x1b[31mKey not found in Redis:\x1b[0m`, key)
            }
        } catch (err) {
            console.error(`\x1b[31mFailed to delete key from Redis:\x1b[0m`, err)
        }
    }
    
    update = async ({ key, data }) => {
        const result = await this.client.set(key, JSON.stringify(data))
        console.log(`\x1b[31mKey updated in Redis:\x1b[0m ${key}`, result)
    }
    
    setList = async ({ key, data }) => {
        try {
            const stringData = JSON.stringify(data)
            await this.client.rPush(key, stringData)
            console.log(`\x1b[31m...Set List in Redis:\x1b[0m`, key)
        } catch (err) {
            console.error(`\x1b[31mFailed to set list in Redis:\x1b[0m`, err)
        }
    }
      
    getList = async ({ key }) => {
        try {
            const list = await this.client.lRange(key, 0, -1)
            return list ? list.map((item) => JSON.parse(item)) : null
        } catch (err) {
            console.error(`\x1b[31mFailed to get list from Redis:\x1b[0m`, err)
            return []
        }
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