'use strict'

require('dotenv').config()
const express = require('express')
const compression = require('compression')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { NotFound, Forbidden } = require('./api/v1/core/error.response')
const passport = require('passport')
const session = require('express-session')
const { v4: uuidv4 } = require('uuid')
const MyLogger = require('./api/v1/loggers/myLogger')
const bodyParser = require('body-parser')
const { WHILELIST_DOMAIN } = require('./api/v1/constants')

const app = express()

// TEST PASSPORT
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
    }),
)

app.use(passport.initialize())
app.use(passport.session())

// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

var corsOptions = {
    origin: function (origin, callback) {
        if (WHILELIST_DOMAIN.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Forbidden('Not allowed by CORS'))
        }
    },
    credentials: true,
}

app.use(cors(corsOptions))

app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(cookieParser())

// INIT DB
// require('./api/v1/dbs/mysql.init')
require('./api/v1/dbs/postgres.init')
require('./api/v1/dbs/es.init')
require('./api/v1/dbs/rabbitmq.init')
require('./api/v1/dbs/websocket.init')

// Middleware save log
app.use((req, res, next) => {
    req.requestId = uuidv4()
    MyLogger.log(`input params ::${req.method}`, [
        req.path,
        { requestId: req.requestId },
        req.method === 'POST' ? req.body : req.query,
    ])
    next()
})

// INIT ROUTES
app.use('', require('./api/v1/routes/index'))

// INIT ERROR HANDLE
app.use((req, res, next) => {
    next(new NotFound())
})

app.use((err, req, res, next) => {
    console.log(err) // Log loi
    const statusCode = err.status || 500
    const resMessage = `${err.status} - ${Date.now() - err.now}ms - Response: ${JSON.stringify(err)}`
    MyLogger.error(resMessage, [
        req.path,
        { requestId: req.requestId },
        {
            message: err.message,
        },
    ])

    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: err.message || 'Internal Server Error',
        // ...err
    })
})

module.exports = app
