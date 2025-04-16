const mongoose = require('mongoose');

const approvedEmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ['admin', 'rider'],
        required: true
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        default: () => new Date(+new Date() + 7*24*60*60*1000) // 7 days from creation
    }
});

module.exports = mongoose.model('ApprovedEmail', approvedEmailSchema);
