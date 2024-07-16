'use strict'

const StatusCodes = require('./statusCodes')
const ReasonPhrases = require('./reasonPhrases')

class SuccessResponse {
    constructor({message, statusCode = StatusCodes.OK, reasonPhrases = ReasonPhrases.OK, data = {}}) {
        this.message = !message ? reasonPhrases : message
        this.status = statusCode
        this.data = data
    }

    send(res, headers = {}) {
        res.headers = headers
        return res.status(this.status).json(this)
    }
}

class Created extends SuccessResponse {
    constructor({message, statusCode = StatusCodes.CREATED, reasonPhrases = ReasonPhrases.CREATED, data = {}}) {
        super({message, statusCode, reasonPhrases, data})
    }
}

module.exports = {
    OK: SuccessResponse,
    Created
}