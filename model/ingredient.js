const constant = require('../constant')
const { model, Schema } = require('mongoose')

const IngredientSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "nama harus ada"],
            index: true,
            unique: true,
        },
        description: {
            type: String,
        }
    }
)

module.exports = model(
    constant.model.INGREDIENT,
    IngredientSchema,
    constant.collection.INGREDIENT,
)