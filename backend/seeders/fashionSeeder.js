import mongoose from 'mongoose';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const fashionProducts = [
    {
        name: "Men's Slim Fit T-Shirt",
        description: "100% cotton, comfortable slim fit t-shirt with crew neck",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        brand: "H&M",
        category: "Fashion",
        stock: 50,
        rating: 4.5,
        numReviews: 120,
        isFeatured: true,
        discount: 10
    },
    {
        name: "Women's Floral Dress",
        description: "Beautiful floral print dress with v-neck and short sleeves",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1550639525-c97d455acf70",
        brand: "Zara",
        category: "Fashion",
        stock: 30,
        rating: 4.7,
        numReviews: 85,
        isFeatured: true,
        discount: 15
    },
    {
        name: "Men's Denim Jacket",
        description: "Classic denim jacket with button closure and chest pockets",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
        brand: "Levi's",
        category: "Fashion",
        stock: 25,
        rating: 4.6,
        numReviews: 65,
        discount: 20
    },
    {
        name: "Women's High-Waisted Jeans",
        description: "Stretch denim jeans with high waist and skinny fit",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
        brand: "Zara",
        category: "Fashion",
        stock: 40,
        rating: 4.4,
        numReviews: 95,
        discount: 10
    },
    {
        name: "Men's Casual Blazer",
        description: "Lightweight blazer perfect for casual occasions",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1593032465175-481acf1a1c0a",
        brand: "H&M",
        category: "Fashion",
        stock: 20,
        rating: 4.3,
        numReviews: 45,
        isFeatured: true,
        discount: 15
    },
    {
        name: "Women's Leather Handbag",
        description: "Genuine leather handbag with multiple compartments",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
        brand: "Michael Kors",
        category: "Fashion",
        stock: 15,
        rating: 4.8,
        numReviews: 75,
        discount: 25
    },
    {
        name: "Men's Chino Pants",
        description: "Comfortable chino pants with regular fit",
        price: 44.99,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80",
        brand: "Uniqlo",
        category: "Fashion",
        stock: 35,
        rating: 4.5,
        numReviews: 60,
        discount: 10
    },
    {
        name: "Women's Silk Blouse",
        description: "Elegant silk blouse with button-down collar",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1551489186-cf8726f514f8",
        brand: "Zara",
        category: "Fashion",
        stock: 25,
        rating: 4.6,
        numReviews: 50,
        isFeatured: true,
        discount: 20
    },
    {
        name: "Men's Leather Belt",
        description: "Genuine leather belt with silver buckle",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
        brand: "H&M",
        category: "Fashion",
        stock: 40,
        rating: 4.4,
        numReviews: 85,
        discount: 15
    },
    {
        name: "Women's Ankle Boots",
        description: "Leather ankle boots with block heel",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
        brand: "Steve Madden",
        category: "Fashion",
        stock: 20,
        rating: 4.7,
        numReviews: 65,
        isFeatured: true,
        discount: 30
    },
    {
        name: "Men's Polo Shirt",
        description: "Classic polo shirt with ribbed collar",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10",
        brand: "Ralph Lauren",
        category: "Fashion",
        stock: 45,
        rating: 4.5,
        numReviews: 90,
        discount: 10
    },
    {
        name: "Women's Cardigan",
        description: "Soft knit cardigan with button closure",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
        brand: "H&M",
        category: "Fashion",
        stock: 30,
        rating: 4.3,
        numReviews: 55,
        discount: 15
    },
    {
        name: "Men's Sneakers",
        description: "Casual sneakers with cushioned sole",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
        brand: "Nike",
        category: "Fashion",
        stock: 35,
        rating: 4.8,
        numReviews: 120,
        isFeatured: true,
        discount: 20
    },
    {
        name: "Women's Sunglasses",
        description: "UV protection sunglasses with metal frame",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
        brand: "Ray-Ban",
        category: "Fashion",
        stock: 25,
        rating: 4.6,
        numReviews: 70,
        discount: 10
    },
    {
        name: "Men's Watch",
        description: "Stainless steel watch with leather strap",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
        brand: "Fossil",
        category: "Fashion",
        stock: 15,
        rating: 4.7,
        numReviews: 45,
        isFeatured: true,
        discount: 25
    },
    {
        name: "Women's Scarf",
        description: "Soft cashmere scarf in various colors",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
        brand: "Zara",
        category: "Fashion",
        stock: 40,
        rating: 4.4,
        numReviews: 60,
        discount: 15
    },
    {
        name: "Men's Hoodie",
        description: "Cotton hoodie with kangaroo pocket",
        price: 44.99,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
        brand: "H&M",
        category: "Fashion",
        stock: 30,
        rating: 4.5,
        numReviews: 80,
        discount: 10
    },
    {
        name: "Women's Leather Jacket",
        description: "Genuine leather jacket with zip closure",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
        brand: "Zara",
        category: "Fashion",
        stock: 15,
        rating: 4.8,
        numReviews: 55,
        isFeatured: true,
        discount: 30
    },
    {
        name: "Men's Formal Shirt",
        description: "Classic formal shirt with spread collar",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
        brand: "H&M",
        category: "Fashion",
        stock: 35,
        rating: 4.6,
        numReviews: 70,
        discount: 15
    },
    {
        name: "Women's Maxi Dress",
        description: "Elegant maxi dress with floral print",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1550639525-c97d455acf70",
        brand: "Zara",
        category: "Fashion",
        stock: 25,
        rating: 4.7,
        numReviews: 65,
        discount: 20
    },
    {
        name: "Men's Cargo Pants",
        description: "Durable cargo pants with multiple pockets",
        price: 54.99,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80",
        brand: "H&M",
        category: "Fashion",
        stock: 30,
        rating: 4.4,
        numReviews: 50,
        discount: 10
    },
    {
        name: "Women's Blazer",
        description: "Tailored blazer with notched lapel",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1593032465175-481acf1a1c0a",
        brand: "Zara",
        category: "Fashion",
        stock: 20,
        rating: 4.6,
        numReviews: 45,
        isFeatured: true,
        discount: 25
    },
    {
        name: "Men's Sweater",
        description: "Wool blend sweater with crew neck",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
        brand: "H&M",
        category: "Fashion",
        stock: 25,
        rating: 4.5,
        numReviews: 60,
        discount: 15
    },
    {
        name: "Women's Tote Bag",
        description: "Spacious tote bag with leather handles",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
        brand: "Michael Kors",
        category: "Fashion",
        stock: 20,
        rating: 4.7,
        numReviews: 55,
        discount: 20
    },
    {
        name: "Men's Loafers",
        description: "Leather loafers with tassel detail",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
        brand: "H&M",
        category: "Fashion",
        stock: 15,
        rating: 4.6,
        numReviews: 40,
        isFeatured: true,
        discount: 30
    },
    {
        name: "Women's Heels",
        description: "Elegant high heels with pointed toe",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
        brand: "Steve Madden",
        category: "Fashion",
        stock: 20,
        rating: 4.5,
        numReviews: 50,
        discount: 25
    },
    {
        name: "Men's Trench Coat",
        description: "Classic trench coat with double-breasted closure",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
        brand: "H&M",
        category: "Fashion",
        stock: 15,
        rating: 4.7,
        numReviews: 35,
        isFeatured: true,
        discount: 20
    },
    {
        name: "Women's Jumpsuit",
        description: "Stylish jumpsuit with wide legs",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1551489186-cf8726f514f8",
        brand: "Zara",
        category: "Fashion",
        stock: 20,
        rating: 4.6,
        numReviews: 45,
        discount: 15
    },
    {
        name: "Men's Backpack",
        description: "Durable backpack with laptop compartment",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        brand: "H&M",
        category: "Fashion",
        stock: 25,
        rating: 4.5,
        numReviews: 60,
        discount: 10
    },
    {
        name: "Women's Denim Jacket",
        description: "Classic denim jacket with button closure",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
        brand: "Zara",
        category: "Fashion",
        stock: 20,
        rating: 4.7,
        numReviews: 55,
        isFeatured: true,
        discount: 25
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

const seedFashion = async () => {
    try {
        // Connect to MongoDB
        const conn = await connectDB();
        console.log('Connected to MongoDB');

        // Delete existing fashion products
        await Product.deleteMany({ category: 'Fashion' });
        console.log('Deleted existing fashion products');

        // Insert new products
        await Product.insertMany(fashionProducts);
        console.log('Fashion products seeded successfully');

        // Close the connection
        await conn.connection.close();
        console.log('MongoDB connection closed');
    } catch (error) {
        console.error('Error seeding fashion products:', error);
        process.exit(1);
    }
};

// Run the seeder
seedFashion(); 