const dev = {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: 'http://localhost:8000/auth/google/callback/',
    passReqToCallback: true
}

const prod = {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: 'http://localhost:8000/auth/google/callback/',
    passReqToCallback: true
}

const config = {
    dev, prod
}


const env = process.env.APP_ENV || 'dev'

module.exports = config[env]