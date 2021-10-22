const { response } = require('../helper')

const UserModel = require('../model/user')

exports.register = async (req, res) => {
    const { name, email, password, gender, weight, height, bmi, birthdate } = req.body
    if (await UserModel.exists({ email })) {
        return res.status(400).json({
            message: "email sudah terdaftar"
        })
    }
    const user = await UserModel.create({
        name,
        email,
        password,
        gender, weight, height, bmi, birthdate
    })
    return response.Success(res, { user })
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (user == null) {
        return response.Error(res, ReferenceError("Email Not Found"))
    }
    const match = await user.checkPassword(password)
    if (!match) {
        return response.Error(res, ReferenceError("Account not found"))
    }

    const token = await user.getToken('email')

    return response.Success(res, { message: "login success", token })
}