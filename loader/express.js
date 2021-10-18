const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const route = require('../route')
const { handler } = require('../helper')

module.exports = async function (app) {

    app.use(cors())
    app.options('*', cors())

    app.use(helmet())

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // route
    app.use('/v1', route())

    // Error handler
    app.use(handler.ErrorLog)
    app.use(handler.SendResponse)
}