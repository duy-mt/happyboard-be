'use strict'

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
}

const ROLE_USER = {
    USER: 'USER',
    ADMIN: 'ADMIN',
}

const REDIS = {
    STATUS: {
        CONNECT: 'connect',
        END: 'end',
        RECONNECT: 'reconnecting',
        ERROR: 'error',
    },
    CONNECT: {
        TIMEOUT: 100000,
        CODE: -99,
        MESSAGE: {
            VN: 'Có lỗi xảy ra với redis',
            EN: 'Have a trouble with redis',
        },
    },
}

const OPTION_SHOW_IDEA = {
    newest: 'createdAt',
    highvote: 'voteCount',
    highview: 'viewCount',
    highcomment: 'commentCount',
}

const STATUS_USER = {
    block: {
        roleId: 4,
        role: 'Pending-User',
    },
    pending: {
        roleId: 4,
        role: 'Pending-User',
    },
    active: {
        roleId: 3,
        role: 'User',
    },
}

const HISTORY_LOGS = {
    CI01: 'Create Idea Log',
    EI01: 'Edit Idea Log',
    DI01: 'Delete Idea Log',
    VI01: 'Vote Idea Log',
    CC01: 'Create Comment Log',
    EC01: 'Edit Comment Log',
    DC01: 'Delete Comment Log',
    RC01: 'Reply Comment Log',
    RC02: 'Reaction Comment Log',
}

const WHILELIST_DOMAIN = [
    process.env.DOMAIN_CLIENT || 'http://localhost:8888',
    process.env.DOMAIN_ADMIN || 'http://localhost:3000',
    undefined, //POSTMAN
]

const HIGHLIGHT_ELASTIC_SEARCH = {
    PRE_TAGS: "<span class='font-extrabold'>",
    POST_TAGS: '</span>',
}

module.exports = {
    HEADER,
    ROLE_USER,
    REDIS,
    OPTION_SHOW_IDEA,
    STATUS_USER,
    HISTORY_LOGS,
    WHILELIST_DOMAIN,
    HIGHLIGHT_ELASTIC_SEARCH,
}
