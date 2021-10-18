const http = require('http')
const socket = require('socket.io')
const handler = require('../service/chat')

module.exports = async (app) => {
  const server = http.createServer(app)
  const io = socket(server, {
    path: '/socket/',
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['authorization'],
      transports: ['websocket', 'polling'],
    },
    allowEIO3: true
  })

  handler(io)

  return server
}