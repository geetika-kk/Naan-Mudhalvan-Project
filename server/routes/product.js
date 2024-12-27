const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Add a product (Admin only)
router.post('/', async (req, res) => {
    const { name, price, description, imageUrl } = req.body;
    const newProduct = new Product({ name, price, description, imageUrl });
    await newProduct.save();
    res.status(201).send('Product added');
});

module.exports = router;