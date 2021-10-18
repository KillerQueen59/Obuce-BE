const constant = require('../constant')
const { model, Schema } = require('mongoose')

const HospitalSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "nama harus ada"],
        },
        address: {
            type: String,
            required: [true, "alamat harus ada"],
        },
        description: {
            type: String,
        },
    }
)

module.exports = model(
    constant.model.HOSPITAL,
    HospitalSchema,
    constant.collection.HOSPITAL,
)