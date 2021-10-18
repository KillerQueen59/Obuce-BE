const { extractToken } = require('../helper/auth')
const UserModel = require('../model/user')

module.exports = function () {
    return async function auth(req, res, next) {
        try {
            const token = extractToken(req.headers)
            res.locals.auth = await UserModel.findFromToken(token, '_id', 'email')
            next()
        } catch (err) {
            next(err)
        }
    }
}
