const orderModel = require('../../models/order')

module.exports = async (request, response) => { 

    try {
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
    } catch {
        console.log(validationResult.error);
        response.status(400).json({
            message: validationResult.error,
            body: request.body
        })
    }

}