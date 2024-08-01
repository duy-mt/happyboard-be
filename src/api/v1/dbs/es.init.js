'use strict'

const { Client } = require('@elastic/elasticsearch')
const { elastic } = require('../../../config')

const client = new Client({
    cloud: {
        id: "7d1b9e121d9b4841ad13ad91aa294073:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQ2MTM2YWE3ZmFjOTU0MzBmYjY3YzBiYTBmMzVlNTk0YiRjMjA0YTkzYzAxYmI0OWRmYmY3YWIxYjJlNTkwOWU1Yg=="
    },
    auth: {
        username: "elastic",
        password: "GB2IoSw4Ct9bQWdCrHjqexr7"
    }
})

// const client = new Client(elastic)

client.info()
    .then(res => console.log('\x1b[42m%s\x1b[0m', `Elastic Search: Connect succefully`))
    .catch(err => console.log(`Elastic Search: Connect error :`, err))

module.exports = client