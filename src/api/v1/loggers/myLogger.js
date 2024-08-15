'use strict'

const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file')
const { v4:uuid } = require('uuid')

class MyLogger {
    constructor() {
        const formatPrint = format.printf(
            ({level, message, context, requestId, timestamp, data}) => {
                return `${timestamp}::${level}::${context}::${requestId}::${message}::${data ? JSON.stringify(data) : ''}`
            }
        )

        this.logger = createLogger({
            format: format.combine(
                format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                formatPrint
            ),
            transports: [
                new transports.Console(),
                new transports.DailyRotateFile({
                    dirname: 'src/logs',
                    filename: 'application-%DATE%.info.log',
                    datePattern: 'YYYY-MM-DD-HH', // tao file sau 1h
                    zippedArchive: true,
                    maxSize: '1m', // dung luong file
                    maxFiles: '14d', // xoa nhat ki sau 14 ngay
                    format: format.combine(
                        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                        formatPrint
                    ),
                    level: 'info',
                }),
                new transports.DailyRotateFile({
                    dirname: 'src/logs',
                    filename: 'application-%DATE%.error.log',
                    datePattern: 'YYYY-MM-DD-HH', // tao file sau 1h
                    zippedArchive: true,
                    maxSize: '1m', // dung luong file
                    maxFiles: '14d', // xoa nhat ki sau 14 ngay
                    format: format.combine(
                        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                        formatPrint
                    ),
                    level: 'error',
                }),
            ]
        })
    }

    commonParams (params) {
        let context, req, data
        if(!Array.isArray(params)) {
            context = params
        } else {
            [context, req, data] = params
        }

        const requestId = req?.requestId || uuid()

        return {
            requestId,
            context,
            data
        }
    }

    log(message, params) {
        const paramLog = this.commonParams(params)
        const logObject = Object.assign({
            message
        }, paramLog)
        
        this.logger.info(logObject)
    }

    error(message, params) {
        const paramLog = this.commonParams(params)
        const logObject = Object.assign({
            message
        }, paramLog)
        
        this.logger.error(logObject)
    }
}

module.exports = new MyLogger()