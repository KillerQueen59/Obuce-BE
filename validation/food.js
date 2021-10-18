const joi = require('joi')

const constant = require('../constant')
const { validateBody } = require('../middleware/validator')

module.exports = {
    validateBody,
    schemas: {
        create: joi.object().keys({
            name: joi.string().required(),
            calories: joi.number().required(),
            description: joi.string().allow(''),
            price: joi.number(),
            nutritions: joi.array().required(),
            ingredients: joi.array().required(),
            cookingStep: joi.array(),
        }),
        delete: joi.object().keys({
            id: joi.string().required(),
        }),
    }
}