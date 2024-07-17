'use strict'

const HEADER = {
    API_KEY:'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization'
}

const ROLE_USER = {
    USER: 'USER',
    ADMIN: 'ADMIN'
}

const REDIS = {
    STATUS: {
        CONNECT: 'connect',
        END: 'end',
        RECONNECT: 'reconnecting',
        ERROR: 'error'
    },
    CONNECT: {
        TIMEOUT: 100000,
        CODE: -99,
        MESSAGE: {
            VN: 'Có lỗi xảy ra với redis',
            EN: 'Have a trouble with redis'
        }
    }
}

module.exports = {
    HEADER,
    ROLE_USER,
    REDIS,
}