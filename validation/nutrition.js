const joi = require('joi')

const constant = require('../constant')
const { validateBody } = require('../middleware/validator')

module.exports = {
    validateBody,
    schemas: {
        create: joi.object().keys({
            name: joi.string().required(),
            description: joi.string().required(),
        }),
        update: joi.object().keys({
            description: joi.string().required(),
        }),
    }
}