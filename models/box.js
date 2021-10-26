const { model, Schema } = require('mongoose')

module.exports = model('Boxes', new Schema({
    name: {
        type: String,
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        trim: true
    },
    items: {
        type: Array
    }
}))