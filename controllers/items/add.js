const Joi = require('@hapi/joi')
const itemModel = require('../../models/item')

module.exports = (request, response) => {
    const schema = Joi.object({

        price: Joi.string()
            .required(),  

        name: Joi.string()
            .required(),
        
        package: Joi.string()
            .required(),

        cat: Joi.string()
            .required(),
    })
    const validationResult = schema.validate(request.body);

    if (!validationResult.error) {

        itemModel.create({
            name: request.body.name,
            price: request.body.price,
            package:  request.body.package,
            cat: request.body.cat

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
