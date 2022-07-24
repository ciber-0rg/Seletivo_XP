const Joi = require('joi');

module.exports = {

    withdrawDTO : Joi.object().keys({
        codCliente: Joi.number().required().positive(),
        valor: Joi.number().positive().required()
    }).required().messages({
        'any.required': '400 | {{#label}} is required',
        'number.base': '422 | {{#label}} must be a number',
        'number.positive': '422 | {{#label}} must greater than zero',
    }),

    loginDTO: Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        senha: Joi.string().required(),
    }).messages({
        'any.required': '400 | {{#label}} is required',
        'string.empty': 'Some required fields are missing',
    }),
}