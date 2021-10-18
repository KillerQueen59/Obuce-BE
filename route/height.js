const { Router } = require('express')
const controller = require('../controller/height')
const { validateBody, schemas } = require('../validation/height')
const { auth } = require('../middleware')
const { handler } = require('../helper')

const route = Router()

exports.heightRoute = (app) => {
    app.use('/height', route)

    route.post('/', auth(), validateBody(schemas.create), handler.Catcher(controller.create))
}