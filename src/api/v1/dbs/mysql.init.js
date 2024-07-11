'use strict'

// const mysql = require('mysql2/promise')
// const {host, user, password, database} = require('../../../config/mysql.config')

// const db = mysql.createPool({
//     host, user, password, database
// })
const { Sequelize } = require('sequelize')
const config = require('../../../config/mysql.config')
const sequelize = new Sequelize(config)

async function testConnection() {   
    try {     
        await sequelize.authenticate();
        console.log('Mysql connected succefully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
testConnection();

module.exports = sequelize