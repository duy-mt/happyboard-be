const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')

const { googleCloud } = require('../../../config')

passport.use(
    new GoogleStrategy(googleCloud, function (
        request,
        accessToken,
        refreshToken,
        profile,
        done,
    ) {
        done(null, profile)
    }),
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

module.exports = passport
