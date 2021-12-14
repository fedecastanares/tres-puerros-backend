const orderModel = require('../../models/order')

module.exports = async (request, response) => {
    try { 
        
        const orders = await orderModel.find({}, '-__v');

        response.json({
            orders
        });
    } catch (error) {
        console.error(error);
    }
}