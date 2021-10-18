require('dotenv').config()

const chalk = require('chalk')
const express = require('express')
const loader = require('./loader')

function formatLog() {
  const timestamp = `[${new Date()}]`
  const urlInfo = `Server run on ${process.env.APP_URL}`
  return [chalk.hex('#72cc7d')(timestamp), chalk.hex('#3796f0')(urlInfo)].join(
    ' '
  )
}

function logMessage() {
  return () => console.log(formatLog())
}

function runServer() {
  const app = express()
  const port = process.env.PORT || 3000
  loader(app)
    .then((server) => server.listen(port, logMessage()))
    .catch((err) => console.error(err))
}

runServer()