const constant = require('../constant')
const { model, Schema } = require('mongoose')

const MessageSchema = new Schema(
    {
        text: {
            type: String,
            required: [true, "nama harus ada"],
        },
        sender: {
            type: Schema.Types.ObjectId,
            required: [true, "user id harus ada"],
            ref: constant.model.USER
        },
        receiver: {
            type: Schema.Types.ObjectId,
            required: [true, "user id harus ada"],
            ref: constant.model.USER
        },
    }
)

module.exports = model(
    constant.model.MESSAGE,
    MessageSchema,
    constant.collection.MESSAGE,
)