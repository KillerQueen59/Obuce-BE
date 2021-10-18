const { response } = require('../helper')
const foodModel = require('../model/food')
const ingredientModel = require('../model/ingredient')
const nutritionModel = require('../model/nutrition')
const { log } = require('../helper')

exports.index = async (req, res) => {
    const { populateNutritions, populateIngredients } = req.query

    const foods = await foodModel.find()
        .populate((populateNutritions == 'true' ? 'nutritions.nutrition' : ''))
        .populate((populateIngredients == 'true' ? 'ingredients.ingredient' : ''))

    return response.Success(res, {
        foods
    })
}

exports.create = async (req, res) => {
    const { name, calories, description, price, nutritions, ingredients, cookingStep } = req.body

    // check if ingredient exist in database
    if (!await ingredientModel.exists({
        _id: { $in: ingredients.map(i => i.ingredient) }
    })) {
        throw ReferenceError("ingredient not found")
    }

    // check if nutrition exist in database
    if (!await nutritionModel.exists({
        _id: { $in: nutritions.map(i => i.nutrition) }
    })) {
        throw ReferenceError("nutrition not found")
    }

    const food = await foodModel.create({
        name,
        calories,
        description,
        price,
        nutritions,
        ingredients,
        cookingStep,
    });

    return response.Success(res, { food })
}

exports.update = async (req, res) => {
    const { id } = req.params
    const { name, calories, description, price, nutritions, ingredients, cookingStep } = req.body

    const food = await foodModel.findByIdAndUpdate(id, {
        name,
        calories,
        description,
        price,
        nutritions,
        ingredients,
        cookingStep,
    }, { new: true })

    return response.Success(res, { food })
}

exports.delete = async (req, res) => {
    const { id } = req.params

    await foodModel.findByIdAndDelete(id)

    return response.Success(res, { message: "delete success" })
}