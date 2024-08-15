'use strict'

const { OK, Created } = require("../core/success.response")
const AccessService = require("../services/access.service")

class AccessController {
    login = async (req, res, next) => {
        req.body.deviceToken = req.headers['device-token']
        const data = await AccessService.login(req.body)

        res.cookie('access-token', data.tokens.accessToken, {
            maxAge: 10 * 24 * 60 * 60 * 1000,
        }).cookie('refresh-token', data.tokens.refreshToken, {
            maxAge: 10 * 24 * 60 * 60 * 1000,
        }).cookie('userId', data.user.id, {
            maxAge: 10 * 24 * 60 * 60 * 1000,
        })

        new OK({
            message: 'Login successfully',
            data
        }).send(res)
    }

    signUp = async (req, res, next) => {
        const data = await AccessService.signUp(req.body)

        res.cookie('access-token', data.tokens.accessToken, {
            maxAge: 10 * 24 * 60 * 60 * 1000
        }).cookie('refresh-token', data.tokens.refreshToken, {
            maxAge: 10 * 24 * 60 * 60 * 1000
        }).cookie('userId', data.user.id, {
            maxAge: 10 * 24 * 60 * 60 * 1000
        })

        new Created({
            message: 'Register successfully',
            data
        }).send(res)
    }

    logout = async (req, res, next) => {
        res.clearCookie('access-token')
        res.clearCookie('refresh-token')
        res.clearCookie('userId')
        new OK({
            message: 'Logout successfully',
            data: await AccessService.logout(req.token)
        }).send(res)
    }

    refreshToken = async (req, res, next) => {
        req.body.deviceToken = req.headers['device-token']
        const data = await AccessService.handleRefreshToken(req.body)

        res.cookie('access-token', data.accessToken, {
            maxAge: 10 * 24 * 60 * 60 * 1000
        })

        new OK({
            message: 'Logout successfully',
            data
        }).send(res)
    }

    signUpWithGoogle = async (req, res, next) => {
        const data = await AccessService.signUpWithGoogle({
            user: req.user,
            deviceToken: req.headers['device-token']
        })

        res.cookie('access-token', data.tokens.accessToken, {
            maxAge: 10 * 24 * 60 * 60 * 1000
        }).cookie('refresh-token', data.tokens.refreshToken, {
            maxAge: 10 * 24 * 60 * 60 * 1000
        }).cookie('userId', data.user.id, {
            maxAge: 10 * 24 * 60 * 60 * 1000
        }).redirect(process.env.DOMAIN_FRONTEND ? process.env.DOMAIN_FRONTEND : 'http://localhost:8888/')
        
        res.redirect('http://localhost:8888/')
        new Created({
            message: 'Register with google successfully',
            data
        }).send(res)
    }

    sendEmailForgotPW = async (req, res, next) => {
        new OK({
            message: 'Send token reset password successfully!',
            data: await AccessService.forgotPW(req.body)
        }).send(res)
    }

    validateToken = async (req, res, next) => {
        let data = await AccessService.validateToken(req.query)
        new OK({
            message: 'Validate token successfully!',
            data
        }).send(res)
    }

    resetPW = async (req, res, next) => {
        let data = await AccessService.changePW(req.body)
        new OK({
            message: 'Update password successfully!',
            data
        }).send(res)
    }

    updatePW = async (req, res, next) => {
        let data = await AccessService.updatePW(req.body)
        new OK({
            message: 'Update password successfully!',
            data
        }).send(res)
    }
}

module.exports = new AccessController()