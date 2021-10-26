const Joi = require('@hapi/joi')
const BoxModel = require('../../models/box')

module.exports = (request, response) => {
    const schema = Joi.object({
        name: Joi.string()
            .required(),
        
        price: Joi.number()
            .required(),
    })
    const validationResult = schema.validate(request.body);

    if (!validationResult.error) {

        BoxModel.create({
            name: request.body.name,
            price: request.body.price
        }, (error, item) => {
            if (error) {
                response.status(500).json({
                    message: 'No se pudo crear el item',
                    error: error
                })
            } else {
                response.json({
                    item
                 })    
            }
        })
    } else {
        response.status(400).json({
            message: validationResult.error,
            body: request.body
        })
    }
}
