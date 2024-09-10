// CLOUD
const dev = {
    credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY,
    },
}

// LOCAL
const prod = {
    credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY,
    },
}

const config = {
    dev,
    prod,
}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
