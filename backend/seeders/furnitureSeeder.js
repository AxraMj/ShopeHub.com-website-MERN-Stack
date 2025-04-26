import mongoose from 'mongoose';
import Product from '../models/Product.js';
import dotenv from 'dotenv';
dotenv.config();

const furnitureProducts = [
    {
        name: "Modern Sofa Set",
        description: "Contemporary 3-seater sofa with matching loveseat, featuring premium fabric and comfortable cushions.",
        price: 1299.99,
        image: "https://images.unsplash.com/photo-1555041469-8865aef1c8c6",
        brand: "IKEA",
        category: "Furniture",
        countInStock: 15,
        rating: 4.7,
        numReviews: 85,
        isFeatured: true,
        discount: 0
    },
    {
        name: "Dining Table Set",
        description: "6-seater dining table with matching chairs, made from solid oak with a natural finish.",
        price: 899.99,
        image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a",
        brand: "Ashley",
        category: "Furniture",
        countInStock: 12,
        rating: 4.6,
        numReviews: 65,
        isFeatured: true,
        discount: 0
    },
    {
        name: "King Size Bed Frame",
        description: "Modern platform bed frame with upholstered headboard and under-bed storage.",
        price: 799.99,
        image: "https://images.unsplash.com/photo-1505693314120-0d44334c0a54",
        brand: "Zinus",
        category: "Furniture",
        countInStock: 20,
        rating: 4.8,
        numReviews: 120,
        isFeatured: true,
        discount: 0
    },
    {
        name: "Coffee Table",
        description: "Glass top coffee table with metal frame and wooden accents.",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1567016432779-094069958ea5",
        brand: "Walker Edison",
        category: "Furniture",
        countInStock: 25,
        rating: 4.5,
        numReviews: 75,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Bookshelf",
        description: "5-tier wooden bookshelf with adjustable shelves and modern design.",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c",
        brand: "Sauder",
        category: "Furniture",
        countInStock: 18,
        rating: 4.4,
        numReviews: 60,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Office Desk",
        description: "L-shaped computer desk with built-in power outlets and cable management.",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd",
        brand: "Bush Business",
        category: "Furniture",
        countInStock: 15,
        rating: 4.7,
        numReviews: 90,
        isFeatured: true,
        discount: 0
    },
    {
        name: "TV Stand",
        description: "Modern TV stand with glass doors, LED lighting, and ample storage space.",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8",
        brand: "Furinno",
        category: "Furniture",
        countInStock: 22,
        rating: 4.6,
        numReviews: 55,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Accent Chair",
        description: "Mid-century modern accent chair with velvet upholstery and gold legs.",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c",
        brand: "Christopher Knight",
        category: "Furniture",
        countInStock: 10,
        rating: 4.8,
        numReviews: 45,
        isFeatured: true,
        discount: 0
    },
    {
        name: "Bar Stool Set",
        description: "Set of 4 industrial-style bar stools with adjustable height and footrest.",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1567016432779-094069958ea5",
        brand: "Flash Furniture",
        category: "Furniture",
        countInStock: 30,
        rating: 4.5,
        numReviews: 70,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Wardrobe",
        description: "Large double-door wardrobe with mirror and internal storage system.",
        price: 599.99,
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c",
        brand: "IKEA",
        category: "Furniture",
        countInStock: 12,
        rating: 4.7,
        numReviews: 50,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Console Table",
        description: "Narrow entryway console table with drawer and shelf storage.",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1567016432779-094069958ea5",
        brand: "Walker Edison",
        category: "Furniture",
        countInStock: 20,
        rating: 4.6,
        numReviews: 40,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Outdoor Dining Set",
        description: "6-piece outdoor dining set with weather-resistant materials.",
        price: 799.99,
        image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a",
        brand: "Mainstays",
        category: "Furniture",
        countInStock: 15,
        rating: 4.5,
        numReviews: 65,
        isFeatured: true,
        discount: 0
    },
    {
        name: "Recliner Chair",
        description: "Power recliner with USB charging port and massage function.",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c",
        brand: "Flash Furniture",
        category: "Furniture",
        countInStock: 8,
        rating: 4.8,
        numReviews: 85,
        isFeatured: true,
        discount: 0
    },
    {
        name: "Nightstand",
        description: "Modern nightstand with drawer and open shelf storage.",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c",
        brand: "Zinus",
        category: "Furniture",
        countInStock: 25,
        rating: 4.4,
        numReviews: 55,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Sectional Sofa",
        description: "L-shaped sectional sofa with chaise lounge and storage ottoman.",
        price: 1499.99,
        image: "https://images.unsplash.com/photo-1555041469-8865aef1c8c6",
        brand: "Ashley",
        category: "Furniture",
        countInStock: 10,
        rating: 4.7,
        numReviews: 75,
        isFeatured: true,
        discount: 0
    },
    {
        name: "Dresser",
        description: "6-drawer dresser with mirror and ample storage space.",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c",
        brand: "IKEA",
        category: "Furniture",
        countInStock: 15,
        rating: 4.6,
        numReviews: 60,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Futon",
        description: "Convertible futon that transforms from sofa to bed.",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1555041469-8865aef1c8c6",
        brand: "DHP",
        category: "Furniture",
        countInStock: 20,
        rating: 4.5,
        numReviews: 45,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Side Table",
        description: "Set of 2 modern side tables with metal frame and glass top.",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1567016432779-094069958ea5",
        brand: "Walker Edison",
        category: "Furniture",
        countInStock: 30,
        rating: 4.4,
        numReviews: 50,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Rocking Chair",
        description: "Traditional wooden rocking chair with padded seat cushion.",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c",
        brand: "Christopher Knight",
        category: "Furniture",
        countInStock: 12,
        rating: 4.7,
        numReviews: 40,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Storage Bench",
        description: "Entryway storage bench with lift-up seat and shoe storage.",
        price: 179.99,
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c",
        brand: "Sauder",
        category: "Furniture",
        countInStock: 18,
        rating: 4.5,
        numReviews: 35,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Bar Cabinet",
        description: "Modern bar cabinet with glass doors and wine storage.",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8",
        brand: "Walker Edison",
        category: "Furniture",
        countInStock: 10,
        rating: 4.6,
        numReviews: 30,
        isFeatured: true,
        discount: 0
    },
    {
        name: "Vanity Table",
        description: "Dressing table with mirror and storage drawers.",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c",
        brand: "Zinus",
        category: "Furniture",
        countInStock: 15,
        rating: 4.7,
        numReviews: 55,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Outdoor Lounge Set",
        description: "3-piece outdoor lounge set with coffee table.",
        price: 599.99,
        image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a",
        brand: "Mainstays",
        category: "Furniture",
        countInStock: 12,
        rating: 4.5,
        numReviews: 45,
        isFeatured: true,
        discount: 0
    },
    {
        name: "Media Console",
        description: "Entertainment center with adjustable shelves and cable management.",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8",
        brand: "Furinno",
        category: "Furniture",
        countInStock: 20,
        rating: 4.6,
        numReviews: 60,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Bunk Bed",
        description: "Twin over twin bunk bed with ladder and safety rails.",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1505693314120-0d44334c0a54",
        brand: "DHP",
        category: "Furniture",
        countInStock: 8,
        rating: 4.7,
        numReviews: 40,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Ottoman",
        description: "Storage ottoman with removable top and fabric upholstery.",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1567016432779-094069958ea5",
        brand: "Sauder",
        category: "Furniture",
        countInStock: 25,
        rating: 4.4,
        numReviews: 50,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Desk Chair",
        description: "Ergonomic office chair with adjustable height and lumbar support.",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd",
        brand: "Flash Furniture",
        category: "Furniture",
        countInStock: 30,
        rating: 4.6,
        numReviews: 85,
        isFeatured: true,
        discount: 0
    },
    {
        name: "Shoe Rack",
        description: "5-tier shoe organizer with open shelves.",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c",
        brand: "SONGMICS",
        category: "Furniture",
        countInStock: 35,
        rating: 4.3,
        numReviews: 65,
        isFeatured: false,
        discount: 0
    },
    {
        name: "Plant Stand",
        description: "3-tier plant stand with metal frame and wooden shelves.",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1567016432779-094069958ea5",
        brand: "SONGMICS",
        category: "Furniture",
        countInStock: 40,
        rating: 4.5,
        numReviews: 45,
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

const seedFurniture = async () => {
    try {
        await connectDB();
        
        // Delete existing furniture products
        await Product.deleteMany({ category: 'Furniture' });
        console.log('Deleted existing furniture products');
        
        // Insert new furniture products
        await Product.insertMany(furnitureProducts);
        console.log('Furniture products seeded successfully');
        
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding furniture products:', err.message);
        process.exit(1);
    }
};

seedFurniture();