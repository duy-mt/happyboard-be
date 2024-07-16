'use strict'

const StatusCodes = require('./statusCodes')
const ReasonPhrases = require('./reasonPhrases')

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message)
        this.status = statusCode
    }
}

class NotFound extends ErrorResponse {
    constructor(message = ReasonPhrases.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND) {
        super(message, statusCode)
    }
}

class BadRequest extends ErrorResponse {
    constructor(message = ReasonPhrases.BAD_REQUEST, statusCode = StatusCodes.BAD_REQUEST) {
        super(message, statusCode)
    }
}

class Unauthorized extends ErrorResponse {
    constructor(message = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED) {
        super(message, statusCode)
    }
}

class Conflict extends ErrorResponse {
    constructor(message = ReasonPhrases.CONFLICT, statusCode = StatusCodes.CONFLICT) {
        super(message, statusCode)
    }
}

class ErrorRedis extends ErrorResponse {
    constructor(message = 'Rediss error', statusCode = -99) {
        super(message, statusCode)
    }
}

module.exports = {
    NotFound,
    BadRequest,
    Unauthorized,
    Conflict,
    ErrorRedis
}