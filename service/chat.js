const { extractToken } = require('../helper/auth')
const { log } = require('../helper')

const messageModel = require('../model/message')
const userModel = require('../model/user')

module.exports = function (io) {
    io.use(async (socket, next) => {
        try {
            const token = extractToken(socket.handshake.headers)
            socket.request.user = await userModel.findFromToken(token, '_id', 'email')
            // socket.request.user = await userModel.findById(socket.handshake.headers.authorization).lean()
            next()
        } catch (err) {
            // log.debug(err)
            socket.disconnect(true)
            next(err)
        }
    })
    io.on('connection', async (socket) => {
        log.debug(`[socket.io:connection:initiate] socket user`)
        socket.join(socket.request.user._id.toString())
        // log.debug(socket.rooms)
        socket.on('disconnect', () => {
            log.debug('[socket.io:connection:disconnected] a user disconnected')
        })
        socket.on('message:send', async (data) => {
            try {
                const { text, sender, receiver } = data
                const message = await messageModel.create({
                    text, sender, receiver
                });

                // shall return newly created message
                socket.emit('message:send', { message })

                // emit event to other members
                socket.to(receiver).emit('message:receive', { message })
            } catch (error) {
                socket.emit('message:error', { error, data })
            }
        })
    })
}