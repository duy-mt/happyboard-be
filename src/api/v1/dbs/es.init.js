'use strict'

const { Client } = require('@elastic/elasticsearch')
const { elastic } = require('../../../config')

// const client = new Client({
//     cloud: {
//         id: elastic.cloudID
//     },
//     auth: {
//         username: elastic.username,
//         password: elastic.password
//     }
// })

const client = new Client(elastic)

client.info()
    .then(res => console.log('\x1b[42m%s\x1b[0m', `Elastic Search: Connect succefully`))
    .catch(err => console.log(`Elastic Search: Connect error :`, err))

module.exports = client