const constant = require('../constant')
const { model, Schema } = require('mongoose')

const NutritionSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "nama harus ada"],
            index: true,
            unique: true,
        },
        description: {
            type: String,
            required: [true, "deskripsi harus ada"],
        },
    }
)

module.exports = model(
    constant.model.NUTRITION,
    NutritionSchema,
    constant.collection.NUTRITION,
)