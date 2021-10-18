const { Router } = require('express')
const controller = require('../controller/message')
const { validateBody, schemas } = require('../validation/message')
// const { auth } = require('../middleware')
const { handler } = require('../helper')

const route = Router()

exports.messageRoute = (app) => {
    app.use('/message', route)

    route.get('/', handler.Catcher(controller.index))
    route.post('/', validateBody(schemas.create), handler.Catcher(controller.create))
}