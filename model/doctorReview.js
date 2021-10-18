const constant = require('../constant')
const { model, Schema } = require('mongoose')

const DoctorReviewSchema = new Schema(
    {
        rate: {
            type: Number,
            required: [true, "rating harus ada"],
        },
        comment: {
            type: String,
        },
        doctorId: {
            type: Schema.Types.ObjectId,
            ref: constant.model.DOCTOR,
            required: [true, 'id dokter harus ada'],
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: constant.model.USER,
            required: [true, 'user id harus ada'],
        }
    }
)

module.exports = model(
    constant.model.DOCTOR_REVIEW,
    DoctorReviewSchema,
    constant.collection.DOCTOR_REVIEW,
)