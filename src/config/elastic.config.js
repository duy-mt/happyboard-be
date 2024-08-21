// CLOUD
const dev = {
    cloud: {
        id: process.env.DEV_ES_CLOUDID || `355139ffce6342abb1325c087525040e:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQzNDMxNGE3ZjJlOWQ0YWFkYmVhNzFkMmUyM2E5OTZlMSRhZmY5NzJjNDk5ZTA0NDlkYTVlNDkxNzFhZjkyYWMzZQ==`
    },
    auth: {
        username: process.env.DEV_ES_USER || `elastic`,
        password: process.env.DEV_ES_PW || `CJHJPBft8P2jp39FpkBzEPgi`
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
