const { updateUserByUserId } = require('../models/repo/user.repo')
const UserService = require('../services/user.service')


class WebSocketService { 
    static onPong = async (ws) => {
        ws.on('pong', () => {
            console.log('Received pong from client');
            ws.isAlive = true;
        });
    }

    static onClose = async (ws, userId) => {

        ws.on('close', async () => {
            const user = await UserService.updateActivityUser({ userId, isOnline: false } )
            console.log('Client disconnected');
        });
    }
}

module.exports = WebSocketService