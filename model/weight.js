const constant = require('../constant')
const { model, Schema } = require('mongoose')

const WeightHistorySchema = new Schema(
    {
        recordDate: {
            type: Date,
            required: [true, "tanggal harus ada"],
        },
        weight: {
            type: Number,
            required: [true, "berat harus ada"],
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: [true, "user id harus ada"],
            ref: constant.model.USER
        },
    }
)

WeightHistorySchema.index({ recordDate: 1, userId: 1 }, { unique: true })

module.exports = model(
    constant.model.WEIGHT_HISTORY,
    WeightHistorySchema,
    constant.collection.WEIGHT_HISTORY,
)