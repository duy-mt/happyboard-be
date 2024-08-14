// CLOUD
const dev = {
    cloud: {
        id: process.env.DEV_ES_CLOUDID || `355139ffce6342abb1325c087525040e:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDM0MzE0YTdmMmU5ZDRhYWRiZWE3MWQyZTIzYTk5NmUxJGFmZjk3MmM0OTllMDQ0OWRhNWU0OTE3MWFmOTJhYzNl`
    },
    auth: {
        username: process.env.DEV_ES_USER || `elastic`,
        password: process.env.DEV_ES_PW || `za9h03ZapB4cicy4bnh4D93A`
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
