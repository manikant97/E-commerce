const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'rider', 'customer'],
        default: 'customer'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
