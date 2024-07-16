'use strict'

require('dotenv').config()
const express = require('express')
const compression = require('compression')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { NotFound } = require('./api/v1/core/error.response')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())

// INIT DB
// require('./api/v1/dbs/mysql.init')
require('./api/v1/dbs/postgres.init')
require('./api/v1/dbs/es.init')

// INIT ROUTES
app.use('', require('./api/v1/routes/index'))

// INIT ERROR HANDLE
app.use((req, res, next) => {
    next(new NotFound())
})

app.use((err, req, res, next) => {
    const statusCode = err.status || 500

    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: err.message || 'Internal Server Error',
        ...err
    })
})

module.exports = app