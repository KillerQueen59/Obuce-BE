const { Router } = require('express')
const controller = require('../controller/user')
// const { validateBody, schemas } = require('../validation/user')
const { auth } = require('../middleware')
const { handler } = require('../helper')

const route = Router()

exports.userRoute = (app) => {
    app.use('/user', route)

    route.get('/', auth(), handler.Catcher(controller.index))
}