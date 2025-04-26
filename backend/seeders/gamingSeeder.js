import mongoose from 'mongoose';
import Product from '../models/Product.js';
import dotenv from 'dotenv';
dotenv.config();

const gamingProducts = [
    {
        name: "PlayStation 5 Console",
        description: "Next-gen gaming with ultra-high speed SSD, ray tracing, and 4K gaming",
        price: 499.99,
        image: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$",
        brand: "Sony",
        category: "Gaming",
        countInStock: 100,
        rating: 4.9,
        numReviews: 320,
        isFeatured: true,
        discountPercentage: 0
    },
    {
        name: "Xbox Series X",
        description: "4K gaming at up to 120 FPS, 1TB SSD, Xbox Velocity Architecture",
        price: 499.99,
        image: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4mRni",
        brand: "Microsoft",
        category: "Gaming",
        countInStock: 120,
        rating: 4.8,
        numReviews: 280,
        isFeatured: true,
        discountPercentage: 5
    },
    {
        name: "Nintendo Switch OLED",
        description: "Handheld gaming console with vibrant OLED screen and enhanced audio.",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d",
        brand: "Nintendo",
        category: "Gaming",
        stock: 25,
        rating: 4.6,
        numReviews: 80,
        isFeatured: true,
        discount: 0
    },
    {
        name: "Gaming Laptop - ASUS ROG Zephyrus",
        description: "High-performance gaming laptop with RTX 3080 and 16GB RAM.",
        price: 1999.99,
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45",
        brand: "ASUS",
        category: "Gaming",
        stock: 10,
        rating: 4.9,
        numReviews: 45,
        isFeatured: true,
        discount: 0
    },
    {
        name: "Gaming Monitor - LG UltraGear",
        description: "27-inch 4K gaming monitor with 144Hz refresh rate and HDR support.",
        price: 599.99,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
        brand: "LG",
        category: "Gaming",
        stock: 18,
        rating: 4.7,
        numReviews: 60,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Gaming Mouse - Razer DeathAdder V2",
        description: "Ergonomic gaming mouse with 20K DPI optical sensor.",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
        brand: "Razer",
        category: "Gaming",
        stock: 30,
        rating: 4.5,
        numReviews: 120,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Gaming Keyboard - Corsair K95",
        description: "Mechanical gaming keyboard with RGB backlighting and macro keys.",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
        brand: "Corsair",
        category: "Gaming",
        stock: 22,
        rating: 4.6,
        numReviews: 85,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Gaming Headset - SteelSeries Arctis Pro",
        description: "High-fidelity gaming headset with DTS Headphone:X v2.0 surround sound.",
        price: 179.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e688c1b2b0f",
        brand: "SteelSeries",
        category: "Gaming",
        stock: 15,
        rating: 4.7,
        numReviews: 95,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Gaming Chair - Secretlab Titan",
        description: "Ergonomic gaming chair with premium materials and adjustable lumbar support.",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267",
        brand: "Secretlab",
        category: "Gaming",
        stock: 12,
        rating: 4.8,
        numReviews: 70,
        isFeatured: true,
        discount: 0
    },
    {
        name: "Gaming Controller - Xbox Elite Series 2",
        description: "Customizable gaming controller with adjustable-tension thumbsticks.",
        price: 179.99,
        image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d",
        brand: "Microsoft",
        category: "Gaming",
        stock: 25,
        rating: 4.6,
        numReviews: 110,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Gaming SSD - Samsung 980 Pro",
        description: "1TB NVMe SSD with read speeds up to 7000MB/s.",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704",
        brand: "Samsung",
        category: "Gaming",
        stock: 30,
        rating: 4.8,
        numReviews: 65,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Gaming Router - ASUS ROG Rapture",
        description: "Tri-band gaming router with dedicated gaming port and VPN fusion.",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704",
        brand: "ASUS",
        category: "Gaming",
        stock: 15,
        rating: 4.5,
        numReviews: 40,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Gaming Mouse Pad - Logitech G840",
        description: "XL gaming mouse pad with optimized surface for precise tracking.",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
        brand: "Logitech",
        category: "Gaming",
        stock: 35,
        rating: 4.4,
        numReviews: 85,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Gaming Capture Card - Elgato 4K60 Pro",
        description: "Internal capture card for 4K60 HDR10 gaming capture.",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704",
        brand: "Elgato",
        category: "Gaming",
        stock: 20,
        rating: 4.7,
        numReviews: 55,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Gaming Microphone - Blue Yeti X",
        description: "Professional USB microphone with high-res LED metering.",
        price: 169.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e688c1b2b0f",
        brand: "Blue",
        category: "Gaming",
        stock: 18,
        rating: 4.6,
        numReviews: 75,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Gaming Webcam - Logitech Brio",
        description: "4K webcam with HDR and Windows Hello support.",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e688c1b2b0f",
        brand: "Logitech",
        category: "Gaming",
        stock: 22,
        rating: 4.5,
        numReviews: 60,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Gaming Speakers - Razer Nommo Pro",
        description: "THX-certified gaming speakers with dedicated subwoofer.",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e688c1b2b0f",
        brand: "Razer",
        category: "Gaming",
        stock: 10,
        rating: 4.7,
        numReviews: 45,
        isFeatured: true,
        discount: 0
    },
    {
        name: "Gaming Desk - Arozzi Arena",
        description: "Curved gaming desk with cable management and mouse pad surface.",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267",
        brand: "Arozzi",
        category: "Gaming",
        stock: 8,
        rating: 4.6,
        numReviews: 35,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Gaming VR Headset - Oculus Quest 2",
        description: "All-in-one VR headset with wireless freedom and high-res display.",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d",
        brand: "Oculus",
        category: "Gaming",
        stock: 15,
        rating: 4.8,
        numReviews: 90,
        isFeatured: true,
        discount: 0
    },
    {
        name: "Gaming Power Supply - Corsair RM850x",
        description: "850W fully modular power supply with 80+ Gold certification.",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704",
        brand: "Corsair",
        category: "Gaming",
        stock: 25,
        rating: 4.7,
        numReviews: 50,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Gaming RAM - G.Skill Trident Z RGB",
        description: "32GB DDR4 RAM with RGB lighting and high performance.",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704",
        brand: "G.Skill",
        category: "Gaming",
        stock: 20,
        rating: 4.6,
        numReviews: 65,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Gaming CPU Cooler - NZXT Kraken X73",
        description: "360mm liquid CPU cooler with RGB lighting.",
        price: 179.99,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704",
        brand: "NZXT",
        category: "Gaming",
        stock: 15,
        rating: 4.7,
        numReviews: 55,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Gaming Case - Lian Li PC-O11 Dynamic",
        description: "Premium ATX case with tempered glass panels.",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704",
        brand: "Lian Li",
        category: "Gaming",
        stock: 18,
        rating: 4.8,
        numReviews: 70,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Gaming Motherboard - ASUS ROG Maximus",
        description: "High-end gaming motherboard with WiFi 6 and PCIe 4.0.",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704",
        brand: "ASUS",
        category: "Gaming",
        stock: 12,
        rating: 4.7,
        numReviews: 45,
        isFeatured: true,
        discount: 0
    },
    {
        name: "Gaming GPU - NVIDIA RTX 3080",
        description: "High-performance graphics card with ray tracing support.",
        price: 699.99,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704",
        brand: "NVIDIA",
        category: "Gaming",
        stock: 5,
        rating: 4.9,
        numReviews: 120,
        isFeatured: true,
        discount: 0
    },
    {
        name: "Gaming CPU - AMD Ryzen 9 5900X",
        description: "12-core gaming processor with high clock speeds.",
        price: 549.99,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704",
        brand: "AMD",
        category: "Gaming",
        stock: 15,
        rating: 4.8,
        numReviews: 95,
        isFeatured: true,
        discount: 0
    },
    {
        name: "Gaming Monitor Arm - Ergotron LX",
        description: "Heavy-duty monitor arm with smooth motion.",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
        brand: "Ergotron",
        category: "Gaming",
        stock: 20,
        rating: 4.6,
        numReviews: 40,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Gaming UPS - CyberPower CP1500PFCLCD",
        description: "1500VA UPS with pure sine wave output.",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704",
        brand: "CyberPower",
        category: "Gaming",
        stock: 12,
        rating: 4.5,
        numReviews: 35,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Gaming Network Card - ASUS PCE-AX58BT",
        description: "WiFi 6 network card with Bluetooth 5.0.",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704",
        brand: "ASUS",
        category: "Gaming",
        stock: 25,
        rating: 4.4,
        numReviews: 30,
        isFeatured: false,
        discount: 0
    }
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

const seedGaming = async () => {
    try {
        await connectDB();
        
        // Delete existing gaming products
        await Product.deleteMany({ category: 'Gaming' });
        console.log('Deleted existing gaming products');
        
        // Insert new gaming products
        await Product.insertMany(gamingProducts);
        console.log('Gaming products seeded successfully');
        
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding gaming products:', err.message);
        process.exit(1);
    }
};

seedGaming(); 