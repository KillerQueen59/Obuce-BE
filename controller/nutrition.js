const { response } = require('../helper')
const nutritionModel = require('../model/nutrition')
const foodModel = require('../model/food')

exports.index = async (_req, res) => {

    const nutritions = await nutritionModel.find()

    return response.Success(res, {
        nutritions
    })
}

exports.create = async (req, res) => {
    const { name, description } = req.body

    const find = await nutritionModel.exists({ name })
    if (find) {
        throw TypeError("duplicate name")
    }

    const ingredient = await nutritionModel.create({
        name,
        description,
    });

    return response.Success(res, { ingredient })
}

exports.update = async (req, res) => {
    const { description } = req.body
    const { name } = req.params

    const ingredient = await nutritionModel.findOneAndUpdate({ name }, {
        name, description
    }, { new: true })

    return response.Success(res, { ingredient })
}

exports.delete = async (req, res) => {
    const { name } = req.params

    const nutrition = await nutritionModel.findOne({ name })

    if (nutrition) {
        if (await foodModel.exists({
            nutritions: {
                $elemMatch: { nutrition: nutrition._id }
            }
        })) throw RangeError("there food with this nutrition, please delete the food first")
        await nutrition.delete()
    }

    return response.Success(res, { message: "delete success" })
}