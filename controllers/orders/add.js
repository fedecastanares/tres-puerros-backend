const orderModel = require('../../models/order')
const Joi = require('@hapi/joi')

module.exports = async (request, response) => {

    const schema = Joi.object({
        personalData: Joi.object({
            aclaraciones: String,
            day: String,
            location: String,
            name: String,
            paymentMethod: String,
            phone: String,
            zone: String,
        }),
        cart: Joi.array()
        /*.items(
            Joi.object({
                // Box
                activeItems: Number,
                aggregates: Array,
                items: [{
                    active: Boolean,
                    kg: String,
                    name: String,
                    qty: String
                }],
                // Item
                name: String,
                price: String,
                units: String
            })
        )*/
    })
    const validationResult = schema.validate(request.body);

    if (!validationResult.error) {

        orderModel.create({
            personalData: request.body.personalData,
            cart: request.body.cart
        }, (error, order) => {
            if (error) {
                response.status(500).json({
                    message: 'No se pudo crear el item',
                    error: error
                })
            } else {
                response.json({
                    order
                })
            }
        })
    } else {
        console.log(validationResult.error);
        response.status(400).json({
            message: validationResult.error,
            body: request.body
        })
    }

}