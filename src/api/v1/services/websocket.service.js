const { updateUserByUserId } = require('../models/repo/user.repo')
const UserService = require('../services/user.service')


class WebSocketService {
    static onPong = async (ws) => {
        ws.on('pong', () => {
            console.log('Received pong from client');
            ws.isAlive = true;
        });
    }

    static onClose = async (ws, user) => {

        ws.on('close', async () => {
            await UserService.updateActivityUser({ userId: user.id, isOnline: false })
            console.log(`User has username:${user.username} disconnected`);
        });
    }
}

module.exports = WebSocketService