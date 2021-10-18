const { response } = require('../helper')

exports.create = (req, res) => {
    return response.Success(res, {
        message: "success create height history"
    })
}