import mongoose from 'mongoose';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const homeApplianceProducts = [
    {
        name: "Samsung 4K Smart TV 55\"",
        description: "Crystal UHD 4K Smart TV with HDR, Smart Hub, and Alexa Built-in",
        price: 699.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Samsung",
        category: "Home & Kitchen",
        stock: 15,
        rating: 4.5,
        numReviews: 120,
        isFeatured: true,
        discount: 10
    },
    {
        name: "LG Front Load Washing Machine",
        description: "Smart Wi-Fi Enabled Front Load Washer with Steam Technology",
        price: 899.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "LG",
        category: "Home & Kitchen",
        stock: 8,
        rating: 4.7,
        numReviews: 85,
        isFeatured: true,
        discount: 15
    },
    {
        name: "Whirlpool French Door Refrigerator",
        description: "Energy Star Certified French Door Refrigerator with Ice Maker",
        price: 1299.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Whirlpool",
        category: "Home & Kitchen",
        stock: 12,
        rating: 4.6,
        numReviews: 95,
        isFeatured: true,
        discount: 5
    },
    {
        name: "Bosch Dishwasher",
        description: "Quiet 44 dBA Dishwasher with CrystalDry Technology",
        price: 799.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Bosch",
        category: "Home & Kitchen",
        stock: 10,
        rating: 4.8,
        numReviews: 75,
        isFeatured: false,
        discount: 0
    },
    {
        name: "KitchenAid Stand Mixer",
        description: "Professional 5-Qt. Stand Mixer with 10 Speeds",
        price: 399.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "KitchenAid",
        category: "Home & Kitchen",
        stock: 20,
        rating: 4.9,
        numReviews: 150,
        isFeatured: true,
        discount: 20
    },
    {
        name: "Ninja Foodi Pressure Cooker",
        description: "8-in-1 Pressure Cooker with Air Fryer and TenderCrisp Technology",
        price: 199.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Ninja",
        category: "Home & Kitchen",
        stock: 25,
        rating: 4.7,
        numReviews: 200,
        isFeatured: true,
        discount: 10
    },
    {
        name: "Dyson V11 Vacuum Cleaner",
        description: "Cordless Vacuum with LCD Screen and 60 Minutes Runtime",
        price: 599.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Dyson",
        category: "Home & Kitchen",
        stock: 15,
        rating: 4.8,
        numReviews: 180,
        isFeatured: true,
        discount: 15
    },
    {
        name: "Breville Smart Oven",
        description: "Convection Toaster Oven with Element IQ System",
        price: 299.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Breville",
        category: "Home & Kitchen",
        stock: 18,
        rating: 4.6,
        numReviews: 90,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Instant Pot Duo Plus",
        description: "9-in-1 Electric Pressure Cooker with Sous Vide",
        price: 129.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Instant Pot",
        category: "Home & Kitchen",
        stock: 30,
        rating: 4.9,
        numReviews: 250,
        isFeatured: true,
        discount: 5
    },
    {
        name: "Vitamix Professional Series 750",
        description: "Professional-Grade Blender with 64 oz. Container",
        price: 499.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Vitamix",
        category: "Home & Kitchen",
        stock: 12,
        rating: 4.8,
        numReviews: 120,
        isFeatured: true,
        discount: 10
    },
    {
        name: "GE Profile Wall Oven",
        description: "Double Wall Oven with Convection and Air Fry",
        price: 2499.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "GE",
        category: "Home & Kitchen",
        stock: 5,
        rating: 4.7,
        numReviews: 45,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Cuisinart Food Processor",
        description: "14-Cup Food Processor with Dicing Kit",
        price: 199.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Cuisinart",
        category: "Home & Kitchen",
        stock: 22,
        rating: 4.6,
        numReviews: 85,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Miele Coffee Machine",
        description: "Fully Automatic Coffee Machine with Milk System",
        price: 999.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Miele",
        category: "Home & Kitchen",
        stock: 8,
        rating: 4.8,
        numReviews: 60,
        isFeatured: true,
        discount: 10
    },
    {
        name: "Wolf Gas Range",
        description: "Professional Gas Range with 6 Burners",
        price: 4999.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Wolf",
        category: "Home & Kitchen",
        stock: 3,
        rating: 4.9,
        numReviews: 30,
        isFeatured: true,
        discount: 5
    },
    {
        name: "KitchenAid Food Processor",
        description: "13-Cup Food Processor with ExactSlice System",
        price: 249.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "KitchenAid",
        category: "Home & Kitchen",
        stock: 15,
        rating: 4.7,
        numReviews: 70,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Breville Barista Express",
        description: "Espresso Machine with Built-in Grinder",
        price: 699.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Breville",
        category: "Home & Kitchen",
        stock: 10,
        rating: 4.8,
        numReviews: 95,
        isFeatured: true,
        discount: 15
    },
    {
        name: "Samsung Bespoke Refrigerator",
        description: "Customizable French Door Refrigerator with FlexZone",
        price: 1999.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Samsung",
        category: "Home & Kitchen",
        stock: 7,
        rating: 4.7,
        numReviews: 55,
        isFeatured: true,
        discount: 10
    },
    {
        name: "LG Styler Steam Closet",
        description: "Smart Clothing Care System with Steam Technology",
        price: 1499.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "LG",
        category: "Home & Kitchen",
        stock: 4,
        rating: 4.6,
        numReviews: 40,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Dyson Pure Cool Air Purifier",
        description: "Air Purifier and Fan with HEPA Filter",
        price: 449.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Dyson",
        category: "Home & Kitchen",
        stock: 18,
        rating: 4.8,
        numReviews: 110,
        isFeatured: true,
        discount: 5
    },
    {
        name: "GE Profile Dishwasher",
        description: "Smart Dishwasher with UltraFresh Vent System",
        price: 899.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "GE",
        category: "Home & Kitchen",
        stock: 12,
        rating: 4.7,
        numReviews: 75,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Wolf Steam Oven",
        description: "Built-in Steam Oven with Convection",
        price: 2999.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Wolf",
        category: "Home & Kitchen",
        stock: 3,
        rating: 4.9,
        numReviews: 25,
        isFeatured: true,
        discount: 10
    },
    {
        name: "KitchenAid Built-in Coffee Maker",
        description: "Built-in Coffee Maker with Thermal Carafe",
        price: 599.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "KitchenAid",
        category: "Home & Kitchen",
        stock: 8,
        rating: 4.6,
        numReviews: 45,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Breville Smart Air Fryer",
        description: "Smart Air Fryer with Element IQ System",
        price: 249.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Breville",
        category: "Home & Kitchen",
        stock: 20,
        rating: 4.7,
        numReviews: 85,
        isFeatured: true,
        discount: 15
    },
    {
        name: "Samsung Bespoke Washer",
        description: "Customizable Front Load Washer with AI Wash",
        price: 1099.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Samsung",
        category: "Home & Kitchen",
        stock: 9,
        rating: 4.8,
        numReviews: 65,
        isFeatured: true,
        discount: 5
    },
    {
        name: "LG InstaView Refrigerator",
        description: "Smart Refrigerator with Knock-on Glass Door",
        price: 2499.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "LG",
        category: "Home & Kitchen",
        stock: 6,
        rating: 4.7,
        numReviews: 50,
        isFeatured: true,
        discount: 10
    },
    {
        name: "Dyson Hot+Cool Fan",
        description: "Bladeless Fan Heater with Air Purification",
        price: 499.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Dyson",
        category: "Home & Kitchen",
        stock: 15,
        rating: 4.8,
        numReviews: 95,
        isFeatured: true,
        discount: 5
    },
    {
        name: "GE Profile Wall Oven",
        description: "Double Wall Oven with Convection and Air Fry",
        price: 2499.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "GE",
        category: "Home & Kitchen",
        stock: 4,
        rating: 4.7,
        numReviews: 40,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Wolf Gas Cooktop",
        description: "Professional Gas Cooktop with 6 Burners",
        price: 2999.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "Wolf",
        category: "Home & Kitchen",
        stock: 3,
        rating: 4.9,
        numReviews: 30,
        isFeatured: true,
        discount: 10
    },
    {
        name: "KitchenAid Built-in Microwave",
        description: "Built-in Microwave with Sensor Cooking",
        price: 499.99,
        image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg",
        brand: "KitchenAid",
        category: "Home & Kitchen",
        stock: 10,
        rating: 4.6,
        numReviews: 55,
        isFeatured: false,
        discount: 0
    }
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

const seedHomeAppliances = async () => {
    try {
        await connectDB();
        
        // Delete existing home appliance products
        await Product.deleteMany({ category: 'Home & Kitchen' });
        console.log('Deleted existing home appliance products');
        
        // Insert new home appliance products
        await Product.insertMany(homeApplianceProducts);
        console.log('Inserted new home appliance products');
        
        mongoose.connection.close();
        console.log('Database connection closed');
    } catch (err) {
        console.error('Error seeding home appliances:', err.message);
        process.exit(1);
    }
};

seedHomeAppliances(); 