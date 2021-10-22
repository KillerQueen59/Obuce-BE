const joi = require('joi')

const constant = require('../constant')
const { validateBody } = require('../middleware/validator')

module.exports = {
    validateBody,
    schemas: {
        register: joi.object().keys({
            name: joi.string().min(6).max(50).uppercase().required(),
            email: joi.string().email().trim().lowercase().required(),
            gender: joi.string().allow(...constant.enumerate.GENDER).required(),
            password: joi.string().min(8).required(),
            weight: joi.number().required(),
            height: joi.number().required(),
            bmi: joi.number().required(),
            birthdate: joi.date().required(),
        }),
        login: joi.object().keys({
            email: joi.string().email().trim().lowercase().required(),
            password: joi.string().min(8).required(),
        }),
    }
}