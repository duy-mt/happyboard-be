'use strict'

const { Sequelize } = require('sequelize')
const { postgres } = require('../../../config')
const sequelize = new Sequelize(postgres)

async function testConnection() {   
    try {     
        await sequelize.authenticate()
        console.log('Postgres connected succefully')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}
testConnection()

module.exports = sequelize