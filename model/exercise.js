const constant = require('../constant')
const { model, Schema } = require('mongoose')

const ExerciseSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "nama harus ada"],
        },
        duration: {
            type: Number,
            required: [true, "durasi harus ada"],
        },
        burnedCalories: {
            type: Number,
            required: [true, "kalori yang terbakar harus ada"],
        },
        description: {
            type: String,
        }
    }
)

module.exports = model(
    constant.model.EXERCISE,
    ExerciseSchema,
    constant.collection.EXERCISE,
)