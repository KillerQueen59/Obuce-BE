const constant = require('../constant')
const { model, Schema } = require('mongoose')

const WorkoutSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "nama harus ada"],
        },
        exercises: [
            {
                order: {
                    type: Number,
                    require: true,
                },
                exercise:
                {
                    ref: constant.model.EXERCISE,
                    type: Schema.Types.ObjectId,
                    required: true,
                }
            }
        ],
        description: {
            type: String,
        }
    }
)

module.exports = model(
    constant.model.WORKOUT,
    WorkoutSchema,
    constant.collection.WORKOUT,
)