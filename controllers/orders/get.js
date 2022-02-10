const orderModel = require('../../models/order')

module.exports = async (request, response) => {
    try { 
        
        const orders = await orderModel.find({delivered: false}, '-__v').limit(100);

        response.json({
            orders
        });
    } catch (error) {
        console.error(error);
    }
}