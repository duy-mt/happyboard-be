'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const accessController = require('../../controllers/access.controller')
const { authentication } = require('../../auth')
const passport = require('../../dbs/passport.init')

const router = express.Router()

router.get('/auth/google', passport.authenticate('google', {
    scope: ['email']
}))
router.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/api/v1/auth/google/success',
        failureRedirect: '/api/v1/auth/google/failure'
}))
router.get('/auth/google/success', asyncHandler(accessController.signUpWithGoogle))
router.get('/auth/google/failure', (req, res, next) => {
    res.json({
        msg: 'Register failed'
    })
})
router.post('/signup', asyncHandler(accessController.signUp))
router.post('/signin', asyncHandler(accessController.login))
router.post('/refresh', asyncHandler(accessController.refreshToken))

router.use(asyncHandler(authentication))

router.post('/logout', asyncHandler(accessController.logout))

module.exports = router