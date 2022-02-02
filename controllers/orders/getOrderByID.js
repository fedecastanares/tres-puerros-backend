const orderModel = require('../../models/order')

module.exports = async (request, response) => {
    try { 
        
        const order = await orderModel.findOne({_id: request.params.id}, '-__v');

        response.json({
            order
        });
    } catch (error) {
        console.error(error);
    }
}