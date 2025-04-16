const express = require('express');
const router = express.Router();
const { User, ApprovedEmail } = require('../models');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get users by role
router.get('/role/:role', async (req, res) => {
    try {
        const users = await User.find({ role: req.params.role }).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create user (signup)
router.post('/', async (req, res) => {
    try {
        // For admin/rider roles, check approved emails
        if (['admin', 'rider'].includes(req.body.role)) {
            const approvedEmail = await ApprovedEmail.findOne({
                email: req.body.email,
                role: req.body.role,
                isUsed: false
            });
            
            if (!approvedEmail) {
                return res.status(403).json({ message: 'Email not approved for this role' });
            }
            
            // Mark email as used
            approvedEmail.isUsed = true;
            await approvedEmail.save();
        }

        const user = new User(req.body);
        const newUser = await user.save();
        const { password, ...userWithoutPassword } = newUser.toObject();
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update user
router.put('/:id', async (req, res) => {
    try {
        const { password, ...updateData } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
