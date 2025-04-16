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
                'https://cdn.eleczo.com/media/catalog/product/cache/83d23ce331a5321aeadc67bc7dc0f5f6/h/a/havells-andria-ceiling-fan-1200mm-maroon.webp?auto=webp&format=pjpg&width=200&height=200&fit=cover',
                'https://rukminim2.flixcart.com/image/416/416/xif0q/fan/m/n/f/-original-imagrdzfzxg4mhkg.jpeg?q=70',
                'https://5.imimg.com/data5/SELLER/Default/2023/3/YW/OB/JZ/185152101/crompton-ceiling-fan.jpg'
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
                'https://www.lg.com/in/images/split-ac/md07544944/gallery/PS-Q19ENZE-Split-AC-Front-View-D-01.jpg',
                'https://www.lg.com/in/images/split-ac/md07544944/gallery/PS-Q19ENZE-Split-AC-Right-View-D-03.jpg',
                'https://www.lg.com/in/images/split-ac/md07544944/gallery/PS-Q19ENZE-Split-AC-Remote-Control-D-02.jpg'
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
                'https://5.imimg.com/data5/SELLER/Default/2021/12/VE/PH/SA/26489853/symphony-diet-12t-personal-tower-air-cooler-12-litres-with-i-pure-technology-white-1000x1000.jpg',
                'https://5.imimg.com/data5/ANDROID/Default/2023/4/300632581/WU/YX/JE/184220450/product-jpeg.jpg',
                'https://5.imimg.com/data5/SELLER/Default/2021/12/QI/FP/WC/26489853/symphony-diet-12t-personal-tower-air-cooler-12-litres.jpg'
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
                'https://rukminim2.flixcart.com/image/850/1000/xif0q/fan/3/i/r/tornado-16-1-400-wall-fan-3-blade-wall-fan-black-almonard-original-imagpg9fhf3shxnz.jpeg',
                'https://5.imimg.com/data5/SELLER/Default/2021/12/VE/PH/SA/26489853/symphony-sense-tower-fan.jpg',
                'https://5.imimg.com/data5/SELLER/Default/2021/12/QI/FP/WC/26489853/symphony-sense-tower-fan-remote.jpg'
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
                'https://www.lg.com/in/images/window-ac/md05911439/gallery/JW-Q12WUZA-Window-AC-Front-View-D-01.jpg',
                'https://www.lg.com/in/images/window-ac/md05911439/gallery/JW-Q12WUZA-Window-AC-Right-View-D-02.jpg',
                'https://www.lg.com/in/images/window-ac/md05911439/gallery/JW-Q12WUZA-Window-AC-Remote-Control-D-03.jpg'
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
                'https://5.imimg.com/data5/SELLER/Default/2021/12/OI/OV/QG/52007302/pedestal-fan.jpg',
                'https://5.imimg.com/data5/SELLER/Default/2022/9/VO/CX/VK/52007302/industrial-pedestal-fan.jpg',
                'https://5.imimg.com/data5/SELLER/Default/2022/9/SX/UW/OT/52007302/industrial-fan-motor.jpg'
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
