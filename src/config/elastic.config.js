// CLOUD
const dev = {
    cloud: {
        id: process.env.DEV_ES_CLOUDID
    },
    auth: {
        username: process.env.DEV_ES_USER,
        password: process.env.DEV_ES_PW
    }
}

// LOCAL
const prod = {
    node: `http://47.129.21.145:9200`,
}

const config = {
    dev, prod
}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
