const { model, Schema } = require('mongoose')

module.exports = model('Items', new Schema({
    name: {
        type: String,
        unique: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    package: {
        type: String,
        required: true,
        trim: true
    },
    cat: {
        type: String,
        required: true,
        trim: true
    }
}))