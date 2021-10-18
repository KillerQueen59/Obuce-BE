const { response } = require('../helper')
const messageModel = require('../model/message')

exports.index = async (_req, res) => {

    const messages = await messageModel.find()

    return response.Success(res, {
        messages
    })
}

exports.create = async (req, res) => {
    const { text, sender, receiver } = req.body

    const message = await messageModel.create({
        text, sender, receiver
    });

    return response.Success(res, { message })
}