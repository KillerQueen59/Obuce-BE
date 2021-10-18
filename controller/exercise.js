const { response } = require('../helper')
const exerciseModel = require('../model/exercise')

exports.index = async (_req, res) => {
    const exercises = await exerciseModel.find()
    return response.Success(res, {
        exercises
    })
}

exports.create = async (req, res) => {
    const { name, duration, burnedCalories, description } = req.body

    const exercise = await exerciseModel.create({
        name, duration, burnedCalories, description
    });

    return response.Success(res, { exercise })
}

exports.update = async (req, res) => {
    const { id } = req.params
    const { name, duration, burnedCalories, description } = req.body

    const exercise = await exerciseModel.findByIdAndUpdate(id, {
        name, duration, burnedCalories, description
    }, {
        new: true
    });

    return response.Success(res, { exercise })
}

exports.delete = async (req, res) => {
    const { id } = req.params

    await exerciseModel.findByIdAndDelete(id)

    return response.Success(res, { message: "delete success" })
}