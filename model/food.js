const constant = require('../constant')
const { model, Schema } = require('mongoose')

const FoodSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "nama harus ada"],
        },
        calories: {
            type: Number,
            required: [true, "jumlah kalori harus ada"]
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
        },
        nutritions: [
            {
                nutrition: {
                    type: Schema.Types.ObjectId,
                    ref: constant.model.NUTRITION,
                    required: [true, "kandungan nutrisi harus ada"],
                },
                quantity: {
                    type: Number,
                    required: [true, "jumlah nutrisi harus ada"],
                }
            }
        ],
        ingredients: [
            {
                ingredient: {
                    type: Schema.Types.ObjectId,
                    ref: constant.model.INGREDIENT,
                    required: [true, "komposisi harus ada"],
                },
                quantity: {
                    type: Number,
                    required: [true, "jumlah komposisi harus ada"],
                }
            }
        ],
        cookingStep: [{
            step: {
                type: Number,
                required: [true, 'urutan harus ada'],
            },
            description: {
                type: String,
                required: [true, 'deskripsi harus ada'],
            }
        }],
        thumbnailPath: {
            type: String,
        }
    }
)

module.exports = model(
    constant.model.FOOD,
    FoodSchema,
    constant.collection.FOOD,
)