const { Router } = require('express')
const controller = require('../controller/food')
const { validateBody, schemas } = require('../validation/food')
// const { auth } = require('../middleware')
const { handler } = require('../helper')

const route = Router()

exports.foodRoute = (app) => {
    app.use('/food', route)

    route.get('/', handler.Catcher(controller.index))
    route.post('/', validateBody(schemas.create), handler.Catcher(controller.create))
    route.put('/:id', validateBody(schemas.create), handler.Catcher(controller.update))
    route.delete('/:id', handler.Catcher(controller.delete))
}