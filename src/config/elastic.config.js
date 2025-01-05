// LOCAL
const dev = {
    node: process.env.DEV_ES_NODE || 'http://localhost:9200',
}

// CLOUD
const prod = {
    node: process.env.PROD_ES_NODE || 'http://localhost:9200',
}

const config = {
    dev,
    prod,
}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
