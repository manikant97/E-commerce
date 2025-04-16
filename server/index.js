const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});

// Import routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

// Welcome route
app.get('/', (req, res) => {
    res.json({ message: 'E-commerce API is running' });
});

// Use routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Something broke!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Available routes:');
    console.log('  GET  /');
    console.log('  GET  /api/products');
    console.log('  GET  /api/users');
    console.log('  GET  /api/orders');
});
