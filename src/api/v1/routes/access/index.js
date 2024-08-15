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
router.post('/forgot-password', asyncHandler(accessController.sendEmailForgotPW))
router.get('/reset-password', asyncHandler(accessController.validateToken))
router.post('/reset-password', asyncHandler(accessController.resetPW))

router.use(asyncHandler(authentication))

router.post('/update-password', asyncHandler(accessController.updatePW))
router.post('/logout', asyncHandler(accessController.logout))

module.exports = router