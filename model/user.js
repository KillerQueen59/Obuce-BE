const constant = require('../constant')
const { model, Schema } = require('mongoose')
const { comparePassword, hashPassword } = require('../service/bcrypt')
const jwt = require('../service/jwt')

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "nama harus ada"],
        },
        email: {
            type: String,
            required: [true, "email harus ada"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'password harus ada'],
        },
        gender: {
            type: String,
            required: [true, "jenis kelamin harus ada"],
            enum: constant.enumerate.GENDER
        },
    }
)

UserSchema.pre('save', async function (next) {
    if ((this.isModified('password') || this.isNew) && !!this.password) {
        this.password = await hashPassword(this.password)
    }
    next()
})

UserSchema.post('save', function (doc, next) {
    doc.password = null
    next()
})

UserSchema.methods.checkPassword = async function (password) {
    const user = await model(constant.model.USER)
        .findById(this._id)
        .select('password')

    return await comparePassword(password, user.password)
}

UserSchema.methods.getToken = async function (field = '_id') {
    const data = this[field]
    return await jwt.generateJWT(data)
}

UserSchema.statics.findFromToken = async function (
    token,
    select,
    field = '_id',
    filter = {}
) {
    const data = await jwt.decodeJWT(token)
    return this.findOne({ [field]: data, ...filter }).select(select)
}

module.exports = model(
    constant.model.USER,
    UserSchema,
    constant.collection.USER,
)