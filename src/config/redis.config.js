const dev = process.env.DEV_REDIS_URI
    ? process.env.DEV_REDIS_URI
    : `redis://default:YYo74ADDrdISfNU6ZTDxQyfdjBTSWTlX@redis-14543.c323.us-east-1-2.ec2.redns.redis-cloud.com:14543`

const prod =
    process.env.PROD_REDIS_URI ||
    `redis://default:YYo74ADDrdISfNU6ZTDxQyfdjBTSWTlX@redis-14543.c323.us-east-1-2.ec2.redns.redis-cloud.com:14543`
const config = {
    dev,
    prod,
}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
