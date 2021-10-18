const { response } = require('../helper')
const nutritionModel = require('../model/nutrition')
const ingredientModel = require('../model/ingredient')

const sortDict = (a, b) => {
    return (a.name < b.name ? -1 : 1)
}

exports.index = async (_req, res) => {

    const format = { name: 1, description: 1, _id: 0 }

    const nutritions = await nutritionModel.find({}, format).lean()
    const ingredients = await ingredientModel.find({}, format).lean()

    const a = nutritions.map(x => {
        return { ...x, type: "nutrition" }
    })

    const b = ingredients.map(x => {
        return { ...x, type: "ingredient" }
    })

    return response.Success(res, {
        dictionary: [...a, ...b].sort(sortDict)
    })
}