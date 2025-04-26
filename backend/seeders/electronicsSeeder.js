import mongoose from 'mongoose';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const electronicsProducts = [
    {
        name: "Samsung QLED 4K Smart TV",
        description: "65-inch QLED 4K UHD Smart TV with Quantum Processor 4K, Dual LED, and Object Tracking Sound",
        price: 1299.99,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/ua65cu8570uxxl/gallery/in-uhd-4k-tv-ua65cu8570uxxl-537344530?$650_519_PNG$",
        brand: "Samsung",
        category: "Electronics",
        countInStock: 100,
        rating: 4.8,
        numReviews: 120,
        isFeatured: true,
        discountPercentage: 15
    },
    {
        name: "Sony WH-1000XM5 Headphones",
        description: "Industry-leading noise cancellation with 30-hour battery life and crystal clear hands-free calling",
        price: 399.99,
        image: "https://electronics.sony.com/image/a27f6c5e3a2af3f38bfb5040e0f0d349/WH-1000XM5_Product_Black.png",
        brand: "Sony",
        category: "Electronics",
        countInStock: 150,
        rating: 4.9,
        numReviews: 85,
        isFeatured: true,
        discountPercentage: 10
    },
    {
        name: "Apple MacBook Pro 14-inch",
        description: "M2 Pro chip, 16GB RAM, 512GB SSD, 14-inch Liquid Retina XDR display",
        price: 1999.99,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673229",
        brand: "Apple",
        category: "Electronics",
        countInStock: 100,
        rating: 4.9,
        numReviews: 150,
        isFeatured: true,
        discount: 5
    },
    {
        name: "Bose QuietComfort 45",
        description: "Wireless noise cancelling headphones with up to 24 hours of battery life",
        price: 329.99,
        image: "https://www.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc45/product_silo_images/QC45_PDP_Ecom-Gallery-B01.png",
        brand: "Bose",
        category: "Electronics",
        countInStock: 100,
        rating: 4.7,
        numReviews: 95,
        discount: 8
    },
    {
        name: "DJI Mini 3 Pro Drone",
        description: "Ultra-lightweight foldable drone with 4K/60fps video and 48MP photos",
        price: 759.99,
        image: "https://www.dji.com/content/dam/dji-mkt/products/mini-3-pro/images/mini-3-pro-1.png",
        brand: "DJI",
        category: "Electronics",
        countInStock: 60,
        rating: 4.8,
        numReviews: 45,
        discount: 12
    },
    {
        name: "Logitech MX Master 3S",
        description: "Advanced wireless mouse with ultra-fast scrolling and precise tracking",
        price: 99.99,
        image: "https://resource.logitech.com/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png",
        brand: "Logitech",
        category: "Electronics",
        countInStock: 75,
        rating: 4.6,
        numReviews: 120,
        discount: 5
    },
    {
        name: "Samsung Galaxy S23 Ultra",
        description: "6.8-inch Dynamic AMOLED 2X, 200MP camera, S Pen included",
        price: 1199.99,
        image: "https://images.samsung.com/is/image/samsung/p6pim/levant/2302/gallery/levant-galaxy-s23-ultra-s918-sm-s918bzgcmea-thumb-534863401",
        brand: "Samsung",
        category: "Electronics",
        countInStock: 150,
        rating: 4.8,
        numReviews: 200,
        isFeatured: true,
        discount: 10
    },
    {
        name: "Apple iPad Pro 12.9-inch",
        description: "M2 chip, 12.9-inch Liquid Retina XDR display, 256GB storage",
        price: 1099.99,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-wifi-spacegray-202104?wid=470&hei=556&fmt=png-alpha&.v=1617126613000",
        brand: "Apple",
        category: "Electronics",
        countInStock: 100,
        rating: 4.9,
        numReviews: 180,
        discount: 8
    },
    {
        name: "Sony PlayStation 5",
        description: "Next-gen gaming console with ultra-high speed SSD and 3D audio",
        price: 499.99,
        image: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$",
        brand: "Sony",
        category: "Electronics",
        countInStock: 100,
        rating: 4.9,
        numReviews: 300,
        isFeatured: true,
        discount: 0
    },
    {
        name: "Microsoft Surface Laptop 5",
        description: "13.5-inch touchscreen, Intel Core i7, 16GB RAM, 512GB SSD",
        price: 1299.99,
        image: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWBrzy?ver=85d4",
        brand: "Microsoft",
        category: "Electronics",
        countInStock: 75,
        rating: 4.7,
        numReviews: 90,
        discount: 12
    },
    {
        name: "GoPro HERO11 Black",
        description: "5.3K60 video, 27MP photos, HyperSmooth 5.0 stabilization",
        price: 399.99,
        image: "https://gopro.com/content/dam/help/hero11-black/product-tour/en/HERO11-Black-Product-Tour-1.png",
        brand: "GoPro",
        category: "Electronics",
        countInStock: 80,
        rating: 4.8,
        numReviews: 75,
        discount: 10
    },
    {
        name: "Samsung Galaxy Watch 5 Pro",
        description: "45mm, Titanium, Bluetooth, Sapphire Crystal Glass",
        price: 449.99,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/2208/gallery/in-galaxy-watch5-pro-r920-sm-r925fzadinu-thumb-534864170",
        brand: "Samsung",
        category: "Electronics",
        countInStock: 90,
        rating: 4.7,
        numReviews: 110,
        discount: 15
    },
    {
        name: "Apple AirPods Pro 2",
        description: "Active Noise Cancellation, Spatial Audio, MagSafe Charging Case",
        price: 249.99,
        image: "https://store.storeimages.cdn.apple.com/4982/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803972361",
        brand: "Apple",
        category: "Electronics",
        countInStock: 120,
        rating: 4.8,
        numReviews: 200,
        discount: 5
    },
    {
        name: "Bose SoundLink Revolve+ II",
        description: "Portable Bluetooth speaker with 360° sound and 17-hour battery life",
        price: 329.99,
        image: "https://www.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/speakers/soundlink_revolve_plus_ii/product_silo_images/SoundLink_Revolve_Plus_II_Black_ECOM.png",
        brand: "Bose",
        category: "Electronics",
        countInStock: 85,
        rating: 4.7,
        numReviews: 85,
        discount: 8
    },
    {
        name: "Sony A7 IV Camera",
        description: "33MP full-frame mirrorless camera with 4K 60p video",
        price: 2499.99,
        image: "https://electronics.sony.com/image/5d02da5c0f99f0fbe7d0fc727d61d390/Alpha-7-IV-wFE-28-70mm-lens.png",
        brand: "Sony",
        category: "Electronics",
        countInStock: 50,
        rating: 4.9,
        numReviews: 45,
        discount: 0
    },
    {
        name: "Logitech MX Keys Mini",
        description: "Compact wireless keyboard with smart backlighting and multi-device control",
        price: 99.99,
        image: "https://resource.logitech.com/content/dam/logitech/en/products/keyboards/mx-keys-mini/gallery/mx-keys-mini-keyboard-top-view-graphite.png",
        brand: "Logitech",
        category: "Electronics",
        countInStock: 75,
        rating: 4.6,
        numReviews: 95,
        discount: 10
    },
    {
        name: "Samsung Galaxy Tab S8 Ultra",
        description: "14.6-inch Super AMOLED, S Pen included, 256GB storage",
        price: 1099.99,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/sm-x900nzaainu/gallery/in-galaxy-tab-s8-ultra-x900-sm-x900nzaainu-531606160",
        brand: "Samsung",
        category: "Electronics",
        countInStock: 80,
        rating: 4.8,
        numReviews: 70,
        discount: 12
    },
    {
        name: "Apple Mac Studio",
        description: "M2 Max chip, 32GB RAM, 512GB SSD",
        price: 1999.99,
        image: "https://store.storeimages.cdn.apple.com/4982/as-images.apple.com/is/mac-studio-select-202306?wid=452&hei=420&fmt=jpeg&qlt=95&.v=1683228470103",
        brand: "Apple",
        category: "Electronics",
        countInStock: 50,
        rating: 4.9,
        numReviews: 40,
        discount: 0
    },
    {
        name: "Sony WF-1000XM4 Earbuds",
        description: "Industry-leading noise cancellation with 8-hour battery life",
        price: 279.99,
        image: "https://electronics.sony.com/image/5d02da5c0f99f0fbe7d0fc727d61d390/WF-1000XM4_Product_Black.png",
        brand: "Sony",
        category: "Electronics",
        countInStock: 100,
        rating: 4.8,
        numReviews: 150,
        discount: 15
    },
    {
        name: "Microsoft Surface Pro 9",
        description: "13-inch touchscreen, Intel Core i7, 16GB RAM, 256GB SSD",
        price: 1299.99,
        image: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4OXzi",
        brand: "Microsoft",
        category: "Electronics",
        countInStock: 75,
        rating: 4.7,
        numReviews: 85,
        discount: 10
    },
    {
        name: "Bose QuietComfort Earbuds II",
        description: "True wireless earbuds with custom-fit technology and noise cancelling",
        price: 299.99,
        image: "https://www.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/earbuds/qc-earbuds-ii/product_silo_images/QC_Earbuds_II_PDP_Ecom-Gallery-B01.png",
        brand: "Bose",
        category: "Electronics",
        countInStock: 15,
        rating: 4.8,
        numReviews: 120,
        discount: 8
    },
    {
        name: "Samsung Odyssey G9 Monitor",
        description: "49-inch Dual QHD, 240Hz, 1ms, Quantum Mini-LED",
        price: 1499.99,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/lc49g95tsswxxl/gallery/in-odyssey-g9-lc49g95tsswxxl-532554190",
        brand: "Samsung",
        category: "Electronics",
        countInStock: 4,
        rating: 4.9,
        numReviews: 65,
        discount: 12
    },
    {
        name: "Apple Studio Display",
        description: "27-inch 5K Retina display with Center Stage camera",
        price: 1599.99,
        image: "https://store.storeimages.cdn.apple.com/4982/as-images.apple.com/is/studio-display-gallery-1-202203?wid=2000&hei=1536&fmt=png-alpha&.v=1645052169441",
        brand: "Apple",
        category: "Electronics",
        countInStock: 6,
        rating: 4.8,
        numReviews: 55,
        discount: 0
    },
    {
        name: "Sony A7R V Camera",
        description: "61MP full-frame mirrorless camera with 8K video",
        price: 3899.99,
        image: "https://www.sony.com/image/4a0a1b1b1b1b1b1b1b1b1b1b1b1b1b1b",
        brand: "Sony",
        category: "Electronics",
        countInStock: 3,
        rating: 4.9,
        numReviews: 30,
        discount: 5
    },
    {
        name: "Logitech MX Mechanical",
        description: "Wireless mechanical keyboard with smart backlighting",
        price: 149.99,
        image: "https://resource.logitech.com/content/dam/logitech/en/products/keyboards/mx-mechanical/gallery/mx-mechanical-keyboard-top-view-graphite.png",
        brand: "Logitech",
        category: "Electronics",
        countInStock: 20,
        rating: 4.7,
        numReviews: 80,
        discount: 10
    },
    {
        name: "Samsung Galaxy Z Fold 4",
        description: "7.6-inch main display, 6.2-inch cover display, S Pen support",
        price: 1799.99,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/2208/gallery/in-galaxy-z-fold4-f936-sm-f936bzsdinu-thumb-534864170",
        brand: "Samsung",
        category: "Electronics",
        countInStock: 7,
        rating: 4.8,
        numReviews: 95,
        discount: 15
    },
    {
        name: "Apple Mac mini M2",
        description: "M2 chip, 16GB RAM, 256GB SSD",
        price: 699.99,
        image: "https://store.storeimages.cdn.apple.com/4982/as-images.apple.com/is/mac-mini-hero-202301?wid=400&hei=400&fmt=jpeg&qlt=95&.v=1670032439499",
        brand: "Apple",
        category: "Electronics",
        countInStock: 12,
        rating: 4.8,
        numReviews: 70,
        discount: 8
    },
    {
        name: "Sony WH-1000XM4 Headphones",
        description: "Industry-leading noise cancellation with 30-hour battery life",
        price: 349.99,
        image: "https://electronics.sony.com/image/5d02da5c0f99f0fbe7d0fc727d61d390/WH-1000XM4_Product_Black.png",
        brand: "Sony",
        category: "Electronics",
        countInStock: 15,
        rating: 4.8,
        numReviews: 180,
        discount: 12
    },
    {
        name: "Microsoft Surface Laptop Studio",
        description: "14.4-inch touchscreen, Intel Core i7, 16GB RAM, 512GB SSD",
        price: 1599.99,
        image: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4OXzi",
        brand: "Microsoft",
        category: "Electronics",
        countInStock: 6,
        rating: 4.7,
        numReviews: 60,
        discount: 10
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

const seedElectronics = async () => {
    try {
        // Connect to MongoDB
        const conn = await connectDB();
        console.log('Connected to MongoDB');

        // Delete existing electronics products
        await Product.deleteMany({ category: 'Electronics' });
        console.log('Deleted existing electronics products');

        // Insert new products
        await Product.insertMany(electronicsProducts);
        console.log('Electronics products seeded successfully');

        // Close the connection
        await conn.connection.close();
        console.log('MongoDB connection closed');
    } catch (error) {
        console.error('Error seeding electronics products:', error);
        process.exit(1);
    }
};

// Run the seeder
seedElectronics(); 