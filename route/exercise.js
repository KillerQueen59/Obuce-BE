const { Router } = require('express')
const controller = require('../controller/exercise')
const { validateBody, schemas } = require('../validation/exercise')
// const { auth } = require('../middleware')
const { handler } = require('../helper')

const route = Router()

exports.exerciseRoute = (app) => {
    app.use('/exercise', route)

    route.get('/', handler.Catcher(controller.index))
    route.post('/', validateBody(schemas.create), handler.Catcher(controller.create))
    route.put('/:id', validateBody(schemas.create), handler.Catcher(controller.update))
    route.delete('/:id', handler.Catcher(controller.delete))
}