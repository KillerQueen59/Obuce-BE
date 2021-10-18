const { response } = require('../helper')
const ingredientModel = require('../model/ingredient')
const foodModel = require('../model/food')
const { log } = require('../helper')

exports.index = async (_req, res) => {

    const ingredients = await ingredientModel.find()

    return response.Success(res, {
        ingredients
    })
}

exports.create = async (req, res) => {
    const { name, description } = req.body

    const find = await ingredientModel.exists({ name })
    if (find) {
        throw TypeError("duplicate name")
    }

    const ingredient = await ingredientModel.create({
        name,
        description,
    });

    return response.Success(res, { ingredient })
}

exports.update = async (req, res) => {
    const { description } = req.body
    const { name } = req.params

    const ingredient = await ingredientModel.findOneAndUpdate({ name }, {
        name, description
    }, { new: true })

    return response.Success(res, { ingredient })
}

exports.delete = async (req, res) => {
    const { name } = req.params

    const ingredient = await ingredientModel.findOne({ name })

    if (ingredient) {
        if (await foodModel.exists({
            ingredients: {
                $elemMatch: { ingredient: ingredient._id }
            }
        })) throw RangeError("there food with this ingredient, please delete the food first")
        await ingredient.delete()
    }

    return response.Success(res, { message: "delete success" })
}