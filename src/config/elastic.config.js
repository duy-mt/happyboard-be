// CLOUD
const dev = {
    node: 'https://localhost:9200',
    auth: {
        username: process.env.DEV_ES_USER || 'elastic',
        password: process.env.DEV_ES_PW || 'pwelastic'
    },
    tls: {
        rejectUnauthorized: false
    }
}

// 355139ffce6342abb1325c087525040e:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQzNDMxNGE3ZjJlOWQ0YWFkYmVhNzFkMmUyM2E5OTZlMSRhZmY5NzJjNDk5ZTA0NDlkYTVlNDkxNzFhZjkyYWMzZQ==
// CJHJPBft8P2jp39FpkBzEPgi

// LOCAL
const prod = {
    cloud: {
        id: process.env.CLOUD_ES_CLOUDID || "7d1b9e121d9b4841ad13ad91aa294073:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQ2MTM2YWE3ZmFjOTU0MzBmYjY3YzBiYTBmMzVlNTk0YiRjMjA0YTkzYzAxYmI0OWRmYmY3YWIxYjJlNTkwOWU1Yg=="
    },
    auth: {
        username: process.env.CLOUD_ES_USER ||  "elastic",
        password: process.env.CLOUD_ES_PW || "GB2IoSw4Ct9bQWdCrHjqexr7"
    }
}

const config = {
    dev, prod
}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
