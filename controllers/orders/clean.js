const orderModel = require('../../models/order')

module.exports = async (request, response) => {
    try { 

        const updateOrder = async (order) => {
            await orderModel.updateOne({_id: order._id}, { delivered : true})
        }

        request.body.map(order => updateOrder(order))

        response.json({response:true})

        
    } catch (error) {
        console.error(error);
    }
}