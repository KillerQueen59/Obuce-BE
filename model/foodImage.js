const constant = require('../constant')
const { model, Schema } = require('mongoose')

const FoodImageSchema = new Schema(
    {
        filename: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: constant.model.USER,
        },
        labels: {
            type: [String],
            // required: true,
        }
    }
)

module.exports = model(
    constant.model.FOODIMG,
    FoodImageSchema,
    constant.collection.FOODIMG,
)