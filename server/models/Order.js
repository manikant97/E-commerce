const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    selectedColor: {
        type: String,
        required: true
    },
    selectedSize: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    },
    rider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
orderSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Order', orderSchema);
