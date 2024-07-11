'use strict'

const { Sequelize } = require('sequelize')
const config = require('../../../config/postgres.config')
const sequelize = new Sequelize(config)

console.log(config)

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Postgres connected succefully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
testConnection();

module.exports = sequelize