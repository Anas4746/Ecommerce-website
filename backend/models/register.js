
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    farms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm'
    }],
    cartProduct: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            default: 0
        }
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;