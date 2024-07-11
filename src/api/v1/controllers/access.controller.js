'use strict'

const { OK, Created } = require("../core/success.response")
const AccessService = require("../services/access.service")

class AccessController {
    login = async (req, res, next) => {
        const metadata = await AccessService.login(req.body)

        res.cookie('access-token', metadata.tokens.accessToken, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000
        }).cookie('refresh-token', metadata.tokens.refreshToken, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000
        })

        new OK({
            message: 'Login successfully',
            metadata
        }).send(res)
    }

    signUp = async (req, res, next) => {
        const metadata = await AccessService.signUp(req.body)

        res.cookie('access-token', metadata.tokens.accessToken, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000
        }).cookie('refresh-token', metadata.tokens.refreshToken, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000
        })

        new Created({
            message: 'Register successfully',
            metadata
        }).send(res)
    }

    logout = async (req, res, next) => {
        res.clearCookie('access-token')
        res.clearCookie('refresh-token')
        new OK({
            message: 'Logout successfully',
            metadata: await AccessService.logout(req.token)
        }).send(res)
    }
}

module.exports = new AccessController()