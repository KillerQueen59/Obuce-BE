const { Router } = require('express')
const controller = require('../controller/nutrition')
const { validateBody, schemas } = require('../validation/nutrition')
// const { auth } = require('../middleware')
const { handler } = require('../helper')

const route = Router()

exports.nutritionRoute = (app) => {
    app.use('/nutrition', route)

    route.get('/', handler.Catcher(controller.index))
    route.post('/', validateBody(schemas.create), handler.Catcher(controller.create))
    route.put('/:name', validateBody(schemas.update), handler.Catcher(controller.update))
    route.delete('/:name', handler.Catcher(controller.delete))
}