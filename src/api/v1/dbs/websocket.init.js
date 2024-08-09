const WebSocket = require('ws');
const WebSocketService = require('../services/websocket.service');
const { heartbeatSocket } = require('../utils');
const UserService = require('../services/user.service')
const initializeWebSocket = async () => {

    const wss = new WebSocket.Server({ port: 8003 });
    console.log('\x1b[42m%s\x1b[0m', `Websocket: Connect access on port ${8003}`)
    wss.on('connection', async (ws, req) => {
        console.log('Client connected')

        const userId = parseInt(req.url.split('userId=')[1])

        const user = await UserService.updateActivityUser({ userId, isOnline: true } )

        WebSocketService.onClose(ws, userId)

    })

    wss.on('close', () => {
        clearInterval(interval);
    });
}

module.exports = initializeWebSocket