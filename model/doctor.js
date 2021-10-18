const constant = require('../constant')
const { model, Schema } = require('mongoose')

const DoctorSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "nama harus ada"],
        },
        hospitalIds: [{
            type: Schema.Types.ObjectId,
            ref: constant.model.HOSPITAL,
        }],
        userId: {
            type: Schema.Types.ObjectId,
            required: [true, "user id harus ada"],
            ref: constant.model.USER
        },
    }
)

module.exports = model(
    constant.model.DOCTOR,
    DoctorSchema,
    constant.collection.DOCTOR,
)