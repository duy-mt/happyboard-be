// CLOUD
const dev = {
    node: process.env.DEV_ES_NODE || 'https://localhost:9200',
    auth: {
        username: process.env.DEV_ES_USER || 'elastic',
        password: process.env.DEV_ES_PW || 'pwelastic',
    },
    tls: {
        rejectUnauthorized: false,
    },
}

// LOCAL
const prod = {
    cloud: {
        id:
            process.env.PROD_ES_CLOUDID
    },
    auth: {
        username: process.env.PROD_ES_USER,
        password: process.env.PROD_ES_PW,
    },
}

const config = {
    dev,
    prod,
}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
