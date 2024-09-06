'use strict'

const { Sequelize } = require('sequelize')
const { mysql } = require('../../../config')
const sequelize = new Sequelize(mysql)

async function testConnection() {
    try {
        await sequelize.authenticate()
        console.log('Mysql connected succefully')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}
testConnection()

module.exports = sequelize
