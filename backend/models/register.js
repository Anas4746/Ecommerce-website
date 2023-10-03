
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;