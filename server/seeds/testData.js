const mongoose = require('mongoose');
const { Product, User, Order, ApprovedEmail } = require('../models');
require('dotenv').config();

const testData = {
    users: [
        {
            email: 'admin@example.com',
            password: 'admin123', // In production, this should be hashed
            role: 'admin',
            name: 'Admin User',
            phone: '1234567890',
            address: {
                street: '123 Admin St',
                city: 'Admin City',
                state: 'AS',
                zipCode: '12345'
            }
        },
        {
            email: 'rider@example.com',
            password: 'rider123',
            role: 'rider',
            name: 'Delivery Rider',
            phone: '9876543210',
            address: {
                street: '456 Rider St',
                city: 'Rider City',
                state: 'RS',
                zipCode: '67890'
            }
        },
        {
            email: 'customer@example.com',
            password: 'customer123',
            role: 'customer',
            name: 'Test Customer',
            phone: '5555555555',
            address: {
                street: '789 Customer St',
                city: 'Customer City',
                state: 'CS',
                zipCode: '11111'
            }
        }
    ],
    products: [
        {
            name: 'Premium Ceiling Fan',
            description: 'High-quality ceiling fan with remote control, 5-speed settings, LED light kit, reversible motor, and whisper-quiet operation. Features elegant wood-finish blades and smart home compatibility.',
            price: 199.99,
            colorVariants: ['Mahogany', 'Classic White', 'Matte Black'],
            sizeVariants: ['48"', '52"', '56"'],
            images: [
                '',
             
            ],
            stock: 50
        },
        {
            name: 'Smart Split AC 1.5 Ton',
            description: 'Energy-efficient 5-star rated split AC with Wi-Fi connectivity, dual inverter, auto-clean function, 4-way swing, and PM 2.5 filter. Features voice control and mobile app support.',
            price: 599.99,
            colorVariants: ['Pearl White', 'Silver'],
            sizeVariants: ['1.5 Ton'],
            images: [
                'https://store.in.panasonic.com/media/catalog/product/cache/40b589206cef99ab7dca1586fe425968/k/z/kz18akyf_baseimage_2510-updated.png',
             
            ],
            stock: 30
        },
        {
            name: 'Portable Air Cooler',
            description: 'Advanced evaporative air cooler with 3-speed settings, 120° oscillation, 12-hour timer, and honeycomb cooling pad. Features digital display, remote control, and ice compartment for enhanced cooling.',
            price: 149.99,
            colorVariants: ['Arctic White', 'Storm Grey'],
            sizeVariants: ['12L', '20L'],
            images: [
               'https://m.media-amazon.com/images/I/71yT7QkzcoL._AC_UF1000,1000_QL80_.jpg',
                'https://m.media-amazon.com/images/I/41pyTu4mGjL._SX300_SY300_QL70_FMwebp_.jpg',
                'https://m.media-amazon.com/images/I/71IlYQGAmXL._AC_UF1000,1000_QL80_.jpg'
            ],
            stock: 75
        },
        {
            name: 'Tower Fan with Remote',
            description: 'Sleek tower fan with 8-speed settings, 80° oscillation, 12-hour timer, and LED display. Features sleep mode, natural breeze mode, and memory function.',
            price: 89.99,
            colorVariants: ['Jet Black', 'Snow White'],
            sizeVariants: ['36"', '42"'],
            images: [
                'https://m.media-amazon.com/images/I/71yT7QkzcoL._AC_UF1000,1000_QL80_.jpg',
                'https://m.media-amazon.com/images/I/41pyTu4mGjL._SX300_SY300_QL70_FMwebp_.jpg',
                'https://m.media-amazon.com/images/I/71IlYQGAmXL._AC_UF1000,1000_QL80_.jpg'
            ],
            stock: 60
        },
        {
            name: 'Window AC 1 Ton',
            description: 'Compact window AC with 3-star energy rating, auto restart, sleep mode, and anti-bacterial filter. Features copper condenser for better cooling and durability.',
            price: 349.99,
            colorVariants: ['Classic White'],
            sizeVariants: ['1 Ton'],
            images: [
                'https://m.media-amazon.com/images/I/71yT7QkzcoL._AC_UF1000,1000_QL80_.jpg',
                'https://m.media-amazon.com/images/I/41pyTu4mGjL._SX300_SY300_QL70_FMwebp_.jpg',
                'https://m.media-amazon.com/images/I/71IlYQGAmXL._AC_UF1000,1000_QL80_.jpg'
            ],
            stock: 40
        },
        {
            name: 'Industrial Pedestal Fan',
            description: 'Heavy-duty pedestal fan with high-torque motor, 3-speed settings, 90° oscillation, and height adjustment. Features all-metal construction and thermal overload protection.',
            price: 129.99,
            colorVariants: ['Industrial Grey', 'Matte Black'],
            sizeVariants: ['24"', '30"'],
            images: [
                'https://m.media-amazon.com/images/I/71yT7QkzcoL._AC_UF1000,1000_QL80_.jpg',
                'https://m.media-amazon.com/images/I/41pyTu4mGjL._SX300_SY300_QL70_FMwebp_.jpg',
                'https://m.media-amazon.com/images/I/71IlYQGAmXL._AC_UF1000,1000_QL80_.jpg'
            ],
            stock: 45
        }
    ],
    
    approvedEmails: [
        {
            email: 'newadmin@example.com',
            role: 'admin',
            isUsed: false
        },
        {
            email: 'newrider@example.com',
            role: 'rider',
            isUsed: false
        }
    ]
};

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Promise.all([
            User.deleteMany({}),
            Product.deleteMany({}),
            Order.deleteMany({}),
            ApprovedEmail.deleteMany({})
        ]);
        console.log('Cleared existing data');

        // Insert users
        const createdUsers = await User.insertMany(testData.users);
        console.log('Users created');

        // Insert products
        const createdProducts = await Product.insertMany(testData.products);
        console.log('Products created');

        // Insert approved emails
        await ApprovedEmail.insertMany(testData.approvedEmails);
        console.log('Approved emails created');

        // Create a test order
        const testOrder = {
            user: createdUsers[2]._id, // customer
            items: [{
                product: createdProducts[0]._id,
                quantity: 2,
                selectedColor: 'White',
                selectedSize: 'M',
                price: createdProducts[0].price
            }],
            totalAmount: createdProducts[0].price * 2,
            status: 'pending',
            shippingAddress: createdUsers[2].address
        };

        await Order.create(testOrder);
        console.log('Test order created');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
