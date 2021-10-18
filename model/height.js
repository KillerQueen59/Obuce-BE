const constant = require('../constant')
const { model, Schema } = require('mongoose')

const HeightHistorySchema = new Schema(
    {
        recordDate: {
            type: Date,
            required: [true, "tanggal harus ada"],
        },
        height: {
            type: Number,
            required: [true, "tinggi harus ada"],
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: [true, "user id harus ada"],
            ref: constant.model.USER
        },
    }
)

HeightHistorySchema.index({ recordDate: 1, userId: 1 }, { unique: true })

module.exports = model(
    constant.model.HEIGHT_HISTORY,
    HeightHistorySchema,
    constant.collection.HEIGHT_HISTORY,
)