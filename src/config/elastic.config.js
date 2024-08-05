// CLOUD
const dev = {
    cloud: {
        id: process.env.DEV_ES_CLOUDID || `7d1b9e121d9b4841ad13ad91aa294073:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQ2MTM2YWE3ZmFjOTU0MzBmYjY3YzBiYTBmMzVlNTk0YiRjMjA0YTkzYzAxYmI0OWRmYmY3YWIxYjJlNTkwOWU1Yg==`
    },
    auth: {
        username: process.env.DEV_ES_USER || `elastic`,
        password: process.env.DEV_ES_PW || `GB2IoSw4Ct9bQWdCrHjqexr7`
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
