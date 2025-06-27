const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @route   GET /api/products
// @desc    Fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// @route   POST /api/products
// @desc    Add a new product
router.post('/', async (req, res) => {
  try {
    const {
      name,
      image,
      price,
      originalPrice,
      rating,
      reviews,
      category,
      isNew,
      colors
    } = req.body;

    if (!name || !image || !price) {
      return res.status(400).json({ error: 'Name, image, and price are required' });
    }

    const newProduct = new Product({
      name,
      image,
      price,
      originalPrice,
      rating,
      reviews,
      category,
      isNew,
      colors
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
