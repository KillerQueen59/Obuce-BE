const joi = require('joi')

const constant = require('../constant')
const { validateBody } = require('../middleware/validator')

module.exports = {
    validateBody,
    schemas: {
        create: joi.object().keys({
            name: joi.string().required(),
            duration: joi.number().required(),
            burnedCalories: joi.number().required(),
            description: joi.string().allow(''),
        }),
        delete: joi.object().keys({
            id: joi.string().required(),
        }),
    }
}