const joi = require('joi')

const constant = require('../constant')
const { validateBody } = require('../middleware/validator')

module.exports = {
    validateBody,
    schemas: {
        create: joi.object().keys({
            text: joi.string().required(),
            sender: joi.string().required(),
            receiver: joi.string().required(),
        }),
        delete: joi.object().keys({
            name: joi.string().required(),
        }),
    }
}