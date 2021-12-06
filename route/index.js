const { Router } = require('express')
const { authRoute } = require('./auth')
const { heightRoute } = require('./height')
const { foodRoute } = require('./food')
const { exerciseRoute } = require('./exercise')
const { dictionaryRoute } = require('./dictionary')
const { nutritionRoute } = require('./nutrition')
const { ingredientRoute } = require('./ingredient')
const { messageRoute } = require('./message')
const { userRoute } = require('./user')

module.exports = () => {
    const route = Router()

    route.get('/', (_req, res) => {
        res.send('Hello World!')
    })

    authRoute(route)
    heightRoute(route)
    foodRoute(route)
    exerciseRoute(route)
    dictionaryRoute(route)
    nutritionRoute(route)
    ingredientRoute(route)
    messageRoute(route)
    userRoute(route)

    return route
}