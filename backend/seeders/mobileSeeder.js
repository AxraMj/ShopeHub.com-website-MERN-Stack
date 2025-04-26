import mongoose from 'mongoose';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const mobileProducts = [
    {
        name: "iPhone 14 Pro Max",
        description: "6.7-inch Super Retina XDR display, A16 Bionic chip, 48MP main camera",
        price: 1099.99,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896",
        brand: "Apple",
        category: "Mobile",
        countInStock: 100,
        rating: 4.9,
        numReviews: 250,
        isFeatured: true,
        discountPercentage: 5
    },
    {
        name: "Samsung Galaxy S23 Ultra",
        description: "6.8-inch Dynamic AMOLED 2X, 200MP camera, S Pen included",
        price: 1199.99,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/2302/gallery/in-galaxy-s23-ultra-s918-sm-s918bzkcins-thumb-534863401",
        brand: "Samsung",
        category: "Mobile",
        countInStock: 85,
        rating: 4.8,
        numReviews: 180,
        isFeatured: true,
        discountPercentage: 10
    },
    {
        name: "Google Pixel 8 Pro",
        description: "Tensor G3 chip, 6.7-inch LTPO OLED, Advanced AI camera features",
        price: 999.99,
        image: "https://lh3.googleusercontent.com/AJqxpqB9j4lHj0Qx9BTlHPjGqNQeqYFyYR1-Bk5WE9zZqgMQfGr8B80o4MQrCBZZagHJZnhVqisJ_id0qLNGe_5k7Xj4mQs=w1000-rw",
        brand: "Google",
        category: "Mobile",
        countInStock: 20,
        rating: 4.7,
        numReviews: 156,
        isFeatured: true,
        discount: 5
    },
    {
        name: "OnePlus 11",
        description: "Snapdragon 8 Gen 2, 6.7-inch AMOLED, 100W SUPERVOOC charging",
        price: 699.99,
        image: "https://image01.oneplus.net/ebp/202301/04/1-m00-45-36-rb8lb2o1fdyawazcaakxhiwn8ds177.png",
        brand: "OnePlus",
        category: "Mobile",
        countInStock: 15,
        rating: 4.6,
        numReviews: 134,
        discount: 15
    },
    {
        name: "Xiaomi 13 Pro",
        description: "Leica optics, Snapdragon 8 Gen 2, 6.73-inch AMOLED",
        price: 899.99,
        image: "https://i02.appmifile.com/615_operator_sg/10/03/2023/ce8d1f5f33a2f53e4e1542542b88fd0d.png",
        brand: "Xiaomi",
        category: "Mobile",
        countInStock: 18,
        rating: 4.5,
        numReviews: 98,
        discount: 12
    },
    {
        name: "iPhone 15",
        description: "A16 Bionic chip, 6.1-inch OLED display, Dynamic Island",
        price: 799.99,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=5120&hei=2880&fmt=p-jpg",
        brand: "Apple",
        category: "Mobile",
        countInStock: 35,
        rating: 4.8,
        numReviews: 167,
        discount: 0
    },
    {
        name: "Samsung Galaxy Z Fold 5",
        description: "7.6-inch foldable display, Snapdragon 8 Gen 2, S Pen support",
        price: 1799.99,
        image: "https://images.samsung.com/is/image/samsung/p6pim/levant/2307/gallery/levant-galaxy-z-fold5-f946-sm-f946bzahmea-thumb-537243914",
        brand: "Samsung",
        category: "Mobile",
        countInStock: 10,
        rating: 4.7,
        numReviews: 89,
        isFeatured: true,
        discount: 8
    },
    {
        name: "Nothing Phone (2)",
        description: "Glyph interface, Snapdragon 8+ Gen 1, 6.7-inch OLED",
        price: 599.99,
        image: "https://in.nothing.tech/cdn/shop/files/Phone-2-Dark-Grey-Front.png",
        brand: "Nothing",
        category: "Mobile",
        countInStock: 12,
        rating: 4.4,
        numReviews: 76,
        discount: 10
    },
    {
        name: "Google Pixel 8",
        description: "Tensor G3, 6.2-inch OLED, Advanced AI features",
        price: 699.99,
        image: "https://lh3.googleusercontent.com/PB5YmQQQmUJaAPYX3c8HZeEhyOsF0NxjvZBqoP6e0WZOD9MkLhGP6DDXf_QZO8AIvD9a_YZZtRGPYw9C-_YHAA8_iE_uvGQ=w1000-rw",
        brand: "Google",
        category: "Mobile",
        countInStock: 22,
        rating: 4.6,
        numReviews: 112,
        discount: 5
    },
    {
        name: "Samsung Galaxy Z Flip 5",
        description: "6.7-inch foldable display, Flex Window, Snapdragon 8 Gen 2",
        price: 999.99,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/2307/gallery/in-galaxy-z-flip5-f731-sm-f731blgains-thumb-537243459",
        brand: "Samsung",
        category: "Mobile",
        countInStock: 15,
        rating: 4.5,
        numReviews: 94,
        discount: 12
    },
    {
        name: "OnePlus Nord 3",
        description: "Dimensity 9000, 6.74-inch AMOLED, 80W charging",
        price: 399.99,
        image: "https://image01.oneplus.net/ebp/202306/27/1-m00-51-00-rb8lb2sZybeabfhaaamr3kpvtpm741.png",
        brand: "OnePlus",
        category: "Mobile",
        countInStock: 28,
        rating: 4.4,
        numReviews: 145,
        discount: 15
    },
    {
        name: "iPhone 14 Pro Max",
        description: "A16 Bionic, 6.7-inch ProMotion display, 48MP camera",
        price: 1099.99,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg",
        brand: "Apple",
        category: "Mobile",
        countInStock: 20,
        rating: 4.8,
        numReviews: 234,
        discount: 10
    },
    {
        name: "Xiaomi Redmi Note 12 Pro+",
        description: "200MP camera, 6.67-inch AMOLED, 120W charging",
        price: 349.99,
        image: "https://i02.appmifile.com/231_operator_sg/10/01/2023/8b15a0fc9a5a6f6e2f3a6100c6130682.png",
        brand: "Xiaomi",
        category: "Mobile",
        countInStock: 40,
        rating: 4.3,
        numReviews: 178,
        discount: 18
    },
    {
        name: "Samsung Galaxy A54 5G",
        description: "6.4-inch Super AMOLED, 50MP camera, 5000mAh battery",
        price: 449.99,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/sm-a546ezkeins/gallery/in-galaxy-a54-5g-sm-a546-sm-a546ezkeins-thumb-535265914",
        brand: "Samsung",
        category: "Mobile",
        countInStock: 45,
        rating: 4.4,
        numReviews: 156,
        discount: 15
    },
    {
        name: "Google Pixel 7a",
        description: "Tensor G2, 6.1-inch OLED, Google AI features",
        price: 499.99,
        image: "https://lh3.googleusercontent.com/Z4sNAkOcwx8vpxUVYZK1maPpzxvXO5kVJwm8nGYJqKsNvJkYeEfqgJJM2ZaoPKFAy_m4RyNO3GRxwHqNxv-VHRY-0h6tTLTl=w1000-rw",
        brand: "Google",
        category: "Mobile",
        countInStock: 25,
        rating: 4.5,
        numReviews: 123,
        discount: 8
    },
    {
        name: "OnePlus 11R",
        description: "Snapdragon 8+ Gen 1, 6.7-inch AMOLED, 100W charging",
        price: 549.99,
        image: "https://image01.oneplus.net/ebp/202302/07/1-m00-47-45-rb8lb2phskeadqvyaakf0gpjhka177.png",
        brand: "OnePlus",
        category: "Mobile",
        countInStock: 30,
        rating: 4.5,
        numReviews: 167,
        discount: 12
    },
    {
        name: "iPhone 15 Plus",
        description: "A16 Bionic, 6.7-inch OLED, Dual camera system",
        price: 899.99,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-plus-finish-select-202309-6-7inch-pink?wid=5120&hei=2880&fmt=p-jpg",
        brand: "Apple",
        category: "Mobile",
        countInStock: 28,
        rating: 4.7,
        numReviews: 145,
        discount: 0
    },
    {
        name: "Xiaomi POCO F5",
        description: "Snapdragon 7+ Gen 2, 6.67-inch AMOLED, 67W charging",
        price: 379.99,
        image: "https://i02.appmifile.com/763_operator_sg/11/05/2023/ce6e7867d5c6f5123397ac9c7fc9dece.png",
        brand: "Xiaomi",
        category: "Mobile",
        countInStock: 35,
        rating: 4.4,
        numReviews: 189,
        discount: 20
    },
    {
        name: "Samsung Galaxy M54",
        description: "6.7-inch Super AMOLED Plus, 108MP camera, 6000mAh battery",
        price: 399.99,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/sm-m546bzbeins/gallery/in-galaxy-m54-5g-sm-m546-sm-m546bzbeins-thumb-535852718",
        brand: "Samsung",
        category: "Mobile",
        countInStock: 42,
        rating: 4.3,
        numReviews: 134,
        discount: 15
    },
    {
        name: "Nothing Phone (1)",
        description: "Glyph interface, Snapdragon 778G+, 6.55-inch OLED",
        price: 449.99,
        image: "https://in.nothing.tech/cdn/shop/products/Phone1Front.png",
        brand: "Nothing",
        category: "Mobile",
        countInStock: 15,
        rating: 4.2,
        numReviews: 98,
        discount: 25
    },
    {
        name: "iPhone 14",
        description: "A15 Bionic, 6.1-inch OLED, Dual camera system",
        price: 699.99,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-blue?wid=5120&hei=2880&fmt=p-jpg",
        brand: "Apple",
        category: "Mobile",
        countInStock: 32,
        rating: 4.6,
        numReviews: 212,
        discount: 15
    },
    {
        name: "OnePlus Nord CE 3",
        description: "Dimensity 6020, 6.7-inch AMOLED, 67W charging",
        price: 299.99,
        image: "https://image01.oneplus.net/ebp/202308/16/1-m00-52-36-rb8lb2tXwxoafl6taanagbzjhxm436.png",
        brand: "OnePlus",
        category: "Mobile",
        countInStock: 38,
        rating: 4.3,
        numReviews: 156,
        discount: 18
    },
    {
        name: "Xiaomi 12T Pro",
        description: "200MP camera, Snapdragon 8+ Gen 1, 120W charging",
        price: 649.99,
        image: "https://i02.appmifile.com/285_operator_sg/07/10/2022/3c199e4fa690472e08b9d5a6c6d1e052.png",
        brand: "Xiaomi",
        category: "Mobile",
        countInStock: 22,
        rating: 4.5,
        numReviews: 143,
        discount: 12
    },
    {
        name: "Samsung Galaxy A34",
        description: "6.6-inch Super AMOLED, 48MP camera, 5000mAh battery",
        price: 399.99,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/sm-a346ezkeins/gallery/in-galaxy-a34-5g-sm-a346-sm-a346ezkeins-thumb-535265899",
        brand: "Samsung",
        category: "Mobile",
        countInStock: 48,
        rating: 4.2,
        numReviews: 167,
        discount: 20
    },
    {
        name: "Google Pixel 7",
        description: "Tensor G2, 6.3-inch OLED, Advanced camera features",
        price: 599.99,
        image: "https://lh3.googleusercontent.com/Z4sNAkOcwx8vpxUVYZK1maPpzxvXO5kVJwm8nGYJqKsNvJkYeEfqgJJM2ZaoPKFAy_m4RyNO3GRxwHqNxv-VHRY-0h6tTLTl=w1000-rw",
        brand: "Google",
        category: "Mobile",
        countInStock: 18,
        rating: 4.6,
        numReviews: 178,
        discount: 15
    },
    {
        name: "iPhone 13",
        description: "A15 Bionic, 6.1-inch Super Retina XDR display",
        price: 599.99,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-finish-select-202207-6-1inch-blue?wid=5120&hei=2880&fmt=p-jpg",
        brand: "Apple",
        category: "Mobile",
        countInStock: 25,
        rating: 4.7,
        numReviews: 245,
        discount: 20
    },
    {
        name: "OnePlus 10T",
        description: "Snapdragon 8+ Gen 1, 150W charging, 6.7-inch AMOLED",
        price: 649.99,
        image: "https://image01.oneplus.net/ebp/202208/03/1-m00-3d-f1-rb8lb2lqnqoagsn6aaj8cplqtj8114.png",
        brand: "OnePlus",
        category: "Mobile",
        countInStock: 20,
        rating: 4.4,
        numReviews: 134,
        discount: 25
    },
    {
        name: "Xiaomi 11T Pro",
        description: "108MP camera, 120W charging, Snapdragon 888",
        price: 549.99,
        image: "https://i02.appmifile.com/285_operator_sg/07/10/2022/3c199e4fa690472e08b9d5a6c6d1e052.png",
        brand: "Xiaomi",
        category: "Mobile",
        countInStock: 15,
        rating: 4.3,
        numReviews: 123,
        discount: 30
    },
    {
        name: "Samsung Galaxy S23",
        description: "6.1-inch Dynamic AMOLED 2X, Snapdragon 8 Gen 2",
        price: 799.99,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/2302/gallery/in-galaxy-s23-s911-sm-s911bzgcins-thumb-534863401",
        brand: "Samsung",
        category: "Mobile",
        countInStock: 28,
        rating: 4.7,
        numReviews: 189,
        discount: 10
    },
    {
        name: "iPhone SE (2022)",
        description: "A15 Bionic, 4.7-inch Retina HD display, Touch ID",
        price: 429.99,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-se-finish-select-202207-midnight?wid=5120&hei=2880&fmt=p-jpg",
        brand: "Apple",
        category: "Mobile",
        countInStock: 35,
        rating: 4.5,
        numReviews: 156,
        discount: 15
    }
];

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

const seedMobiles = async () => {
    try {
        // Connect to MongoDB
        const conn = await connectDB();
        console.log('Connected to MongoDB');

        // Delete existing mobile products
        await Product.deleteMany({ category: 'Mobile' });
        console.log('Deleted existing mobile products');

        // Insert new products
        await Product.insertMany(mobileProducts);
        console.log('Mobile products seeded successfully');

        // Close the connection
        await conn.connection.close();
        console.log('MongoDB connection closed');
    } catch (error) {
        console.error('Error seeding mobile products:', error);
        process.exit(1);
    }
};

// Run the seeder
seedMobiles(); 