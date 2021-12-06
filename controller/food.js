const { exec } = require('child_process')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

const { response } = require('../helper')
const UserModel = require('../model/user')
const foodModel = require('../model/food')
const ingredientModel = require('../model/ingredient')
const nutritionModel = require('../model/nutrition')
const foodImageModel = require('../model/foodImage')
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

exports.detect = async (req, res) => {

    // const { _id } = res.locals.auth
    const { _id } = await UserModel.findOne({}, "_id").lean()
    console.log(_id)
    const { filename } = req.file;

    const url = `http://127.0.0.1:8080/detect?image_url=http://127.0.0.1:3000/static/foods/${filename}`

    const { data } = await axios.get(url)
    const labels = data.map(i => {
        return i.name
    })

    const image = await foodImageModel.create({
        filename,
        userId: _id,
        labels,
    })

    // log.debug(labels)
    // log.debug(file)
    // return res.send(file);
    return response.Success(res, {
        // message: "yes",
        image
    })
}

exports.setThumbnail = async (req, res) => {

    const { id } = req.params

    const { file } = req

    // log.debug(file)

    const food = await foodModel.findById(id)
    if (food) {
        if (file) {
            if (food.thumbnailPath) {
                fs.unlinkSync(path.join(__dirname, `../uploads/thumbnail/food/${food.thumbnailPath}`))
            }
            food.thumbnailPath = file.filename
            await food.save()
        }
        return response.Success(res, {
            food
        })
    } else {
        fs.unlinkSync(file.path)
        throw ReferenceError("food not found")
    }
}