const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    colorVariants: [{
        type: String,
        trim: true
    }],
    sizeVariants: [{
        type: String,
        trim: true
    }],
    images: [{
        type: String,  // URLs to product images
    }],
    stock: {
        type: Number,
        default: 0,
        min: 0
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
productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Product', productSchema);
