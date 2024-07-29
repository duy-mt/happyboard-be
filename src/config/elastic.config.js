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
    node: `https://${process.env.PROD_ES_URL}`,
    auth: {
        username: process.env.PROD_ES_USER,
        password: process.env.PROD_ES_PW
    },
    tls: {
        ca: process.env.PROD_ES_CA,
        rejectUnauthorized: false
    }
}

const config = {
    dev, prod
}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]