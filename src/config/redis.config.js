const dev = process.env.DEV_REDIS_URI ? process.env.DEV_REDIS_URI : `redis://default:YYo74ADDrdISfNU6ZTDxQyfdjBTSWTlX@redis-14543.c323.us-east-1-2.ec2.redns.redis-cloud.com:14543`

const prod = {
    host: "redis-14543.c323.us-east-1-2.ec2.redns.redis-cloud.com",
    port: "14543",
    password: "YYo74ADDrdISfNU6ZTDxQyfdjBTSWTlX"
}
const config = {
    dev, prod
}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
