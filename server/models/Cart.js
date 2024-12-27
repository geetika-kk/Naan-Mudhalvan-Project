// models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    username: { type: String, required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            name: String,
            price: Number,
            quantity: Number
        }
    ]
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
