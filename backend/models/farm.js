
const mongoose = require('mongoose');
const { Schema } = mongoose;

const farmSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    users: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;