// const redis = require('redis')
// const { ErrorRedis } = require('../core/error.response')
// const { REDIS } = require('../constants')

// // Strategy create instance redis
// // 1. Create 1 instance -> share it across app
// // 2. Read, Write

// let client = {}
// let connectionTimeout

// const initRedis = () => {
//     const instanceRedis = redis.createClient()
//     client.instanceConnect = instanceRedis
//     handleEventConnection({
//         cntRedis: instanceRedis
//     })
// }

// const closeInstanceRedis = () => {
//     client.instanceConnect.quit()
// }

// const getInstanceRedis = () => client

// const handleTimeoutError = () => {
//     connectionTimeout = setTimeout(() => {
//         throw new ErrorRedis({
//             message: REDIS.CONNECT.MESSAGE.VN
//         })
//     }, REDIS.CONNECT.TIMEOUT)
// }

// const handleEventConnection = ({
//     cntRedis
// }) => {
//     cntRedis.on(REDIS.STATUS.CONNECT, () => {
//         console.log(`Redis connected`)
//         clearTimeout(connectionTimeout)
//     })

//     cntRedis.on(REDIS.STATUS.END, () => {
//         console.log(`Redis end`)
//         handleTimeoutError()
//     })

//     cntRedis.on(REDIS.STATUS.RECONNECT, () => {
//         console.log(`Redis reconnecting`)
//         clearTimeout(connectionTimeout)
//         handleTimeoutError()
//     })

//     cntRedis.on(REDIS.STATUS.ERROR, (err) => {
//         console.log(`Redis error:`, err)
//         handleTimeoutError()
//     })
// }

// initRedis()

// class Redis {
//     constructor () {
//         this.connect()
//     }

//     connect() {

//     }

//     getInstance () {

//     }
// }

// module.exports = {
//     getInstanceRedis,
//     closeInstanceRedis
// }
