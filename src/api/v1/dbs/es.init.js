'use strict'

const { Client } = require('@elastic/elasticsearch')
const esConfig = require('../../../config/es.config')

const client = new Client({
    cloud: {
        id: esConfig.cloudID
    },
    auth: {
        username: esConfig.username,
        password: esConfig.password
    }
})

client.info()
    .then(res => console.log(`Connect Elastic Cloud succefully`))
    .catch(err => console.log(`ES Connect Error :`, err))

module.exports = client