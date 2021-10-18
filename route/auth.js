const { Router } = require('express')
const controller = require('../controller/auth')
const { validateBody, schemas } = require('../validation/auth')
const { handler } = require('../helper')

const route = Router()

exports.authRoute = (app) => {
    app.use('/auth', route)

    route.post('/login', validateBody(schemas.login), handler.Catcher(controller.login))

    route.post('/register', validateBody(schemas.register), handler.Catcher(controller.register))
}