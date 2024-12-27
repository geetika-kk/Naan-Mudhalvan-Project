// routes/cart.js
const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

router.post('/add', async (req, res) => {
    const { username, productId, name, price, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ username });

        if (!cart) {
            cart = new Cart({ username, items: [] });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity; // Update quantity if item already in cart
        } else {
            cart.items.push({ productId, name, price, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart' });
    }
});
router.get('/:username', async (req, res) => {
    try {
        const cart = await Cart.findOne({ username: req.params.username }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart items' });
    }
});
module.exports = router;
