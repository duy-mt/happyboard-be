const WebSocket = require('ws')
const WebSocketService = require('../services/websocket.service')
const { heartbeatSocket } = require('../utils')
const UserService = require('../services/user.service')
const { BadRequest } = require('../core/error.response')

const initializeWebSocket = async () => {
    const wss = new WebSocket.Server({
        port: 8003,
        path: '/ws/',
        host: '0.0.0.0',
    })
    console.log(
        '\x1b[42m%s\x1b[0m',
        `Websocket: Connect access on port ${8003}`,
    )

    wss.on('connection', async (ws, req) => {
        const userIdMatch = req.url.match(/userId=(\d+)/)
        if (!userIdMatch) {
            console.error('Invalid URL: userId not found')
            ws.close()
            return
        }

        const userId = parseInt(userIdMatch[1])

        try {
            const user = await UserService.getUser({ userId: userId })
            if (!user) {
                throw new BadRequest(`User do not exist`)
            }
            await UserService.updateActivityUser({ userId, isOnline: true })
            console.log(`User has username:${user.username} connected`)

            WebSocketService.onClose(ws, user)
        } catch (error) {
            console.error('Failed to update user activity:', error)
            ws.close()
        }
    })

    wss.on('close', () => {
        console.log('WebSocket server closed')
        clearInterval(interval)
    })
}

initializeWebSocket()

module.exports = initializeWebSocket
