const { response } = require('../helper')
const userModel = require('../model/user')

exports.index = async (_req, res) => {

    const user = await userModel.findById(res.locals.auth)

    return response.Success(res, {
        user
    })
}