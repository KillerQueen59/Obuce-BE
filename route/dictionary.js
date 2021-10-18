const { Router } = require('express')
const controller = require('../controller/dictionary')
// const { validateBody, schemas } = require('../validation/height')
// const { auth } = require('../middleware')
const { handler } = require('../helper')

const route = Router()

exports.dictionaryRoute = (app) => {
    app.use('/dictionary', route)

    route.get('/', handler.Catcher(controller.index))
}