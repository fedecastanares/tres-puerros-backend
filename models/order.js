const { model, Schema } = require('mongoose')

module.exports = model('Orders', new Schema({
    personalData: {
        aclaraciones: String,
        day: String,
        location: String,
        name: String,
        paymentMethod: String,
        phone: String,
        zone: String
    },
    cart: [
        // Si es Carrito
        {
            activeItems: Number,
            aggregates: [],
            items: [{
                active: Boolean,
                kg: String,
                name: String,
                package: String,
                units: String
            }],
            name: String,
            package: String,
            price: Number,
        // Si es item
            units: String,
            kg: String
        }
    ],
    delivered: Boolean
}))