
const orderModel = require('../../models/order')

module.exports = async (request, response) => {
    try {

        await orderModel.updateOne({ _id: request.params.id }, { delivered: true })

        response.json({ response: true })

    } catch (error) {
        console.error(error);
    }
}