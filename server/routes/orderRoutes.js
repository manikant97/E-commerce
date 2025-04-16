const express = require('express');
const router = express.Router();
const { Order } = require('../models');

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('items.product')
            .populate('rider', 'name email');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user's orders
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId })
            .populate('items.product')
            .populate('rider', 'name email');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single order
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('items.product')
            .populate('rider', 'name email');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create order
router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Assign rider to order
router.patch('/:id/assign-rider', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { rider: req.body.riderId },
            { new: true }
        ).populate('rider', 'name email');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
