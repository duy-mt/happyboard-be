const dev = {
    clientID: process.env.GOOGLE_CLIENT_ID || '500567881708-esue1unbemjq4iop2bqoil85glaj4i2f.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'happyboard-123',
    callbackURL: '/api/v1/auth/google/callback/',
    passReqToCallback: true
}

const prod = {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: '/api/v1/auth/google/callback/',
    passReqToCallback: true
}

const config = {
    dev, prod
}


const env = process.env.APP_ENV || 'dev'

module.exports = config[env]