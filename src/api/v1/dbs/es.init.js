'use strict'

const { Client } = require('@elastic/elasticsearch')
const { elastic } = require('../../../config')

const client = new Client({
    cloud: {
        id: elastic.cloudID
    },
    auth: {
        username: elastic.username,
        password: elastic.password
    }
})

client.info()
    .then(res => console.log(`Connect Elastic Cloud succefully`))
    .catch(err => console.log(`Elastic Cloud Connect Error :`, err))

module.exports = client