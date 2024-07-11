'use strict'

const StatusCodes = require('./statusCodes')
const ReasonPhrases = require('./reasonPhrases')

class SuccessResponse {
    constructor({message, statusCode = StatusCodes.OK, reasonPhrases = ReasonPhrases.OK, metadata = {}}) {
        this.message = !message ? reasonPhrases : message
        this.status = statusCode
        this.metadata = metadata
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this)
    }
}

class Created extends SuccessResponse {
    constructor({message, statusCode = StatusCodes.CREATED, reasonPhrases = ReasonPhrases.CREATED, metadata = {}}) {
        super({message, statusCode, reasonPhrases, metadata})
    }
}

module.exports = {
    OK: SuccessResponse,
    Created
}