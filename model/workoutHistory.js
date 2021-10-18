const constant = require('../constant')
const { model, Schema } = require('mongoose')

const WorkoutHistorySchema = new Schema(
    {
        recordDate: {
            type: Date,
            required: [true, "tanggal harus ada"],
        },
        quantity: {
            type: Number,
            required: [true, "berat harus ada"],
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: [true, "user id harus ada"],
            ref: constant.model.USER
        },
        workoutId: {
            type: Schema.Types.ObjectId,
            required: [true, "workout id harus ada"],
            ref: constant.model.WORKOUT
        },
    }
)

WorkoutHistorySchema.index({ recordDate: 1, userId: 1, workoutId }, { unique: true })

module.exports = model(
    constant.model.WORKOUT_HISTORY,
    WorkoutHistorySchema,
    constant.collection.WORKOUT_HISTORY,
)