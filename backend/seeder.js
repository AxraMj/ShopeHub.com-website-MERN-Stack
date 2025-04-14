import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

// Load environment variables
dotenv.config();

// MongoDB Connection
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

const products = [
    {
        name: 'Summer Sale - Up to 50% Off',
        description: 'Limited time offer! Get amazing discounts on all electronics. Don\'t miss out on these incredible deals!',
        price: 0,
        image: 'https://images.pexels.com/photos/974964/pexels-photo-974964.jpeg?cs=srgb&dl=pexels-olly-974964.jpg&fm=jpg',
        brand: 'Special Offer',
        category: 'Promotion',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        isFeatured: true
    },
    {
        name: 'New Arrivals - Latest Tech',
        description: 'Discover our newest collection of cutting-edge technology. Be the first to experience innovation!',
        price: 0,
        image: 'https://mrwallpaper.com/images/hd/shopping-girl-fashion-bmcc1ws4ptcip9dl.jpg',
        brand: 'New Collection',
        category: 'Promotion',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        isFeatured: true
    },
    {
        name: '4.4 SPECIAL OFFER - FLASH SALE',
        description: 'GET UP TO 50% OFF! Limited time flash sale with massive discounts. Shop now before it\'s too late!',
        price: 0,
        image: 'https://c4.wallpaperflare.com/wallpaper/448/52/893/beautiful-eyewear-fashion-female-wallpaper-preview.jpg',
        brand: 'Flash Sale',
        category: 'Promotion',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        isFeatured: true
    },
    {
        name: 'Free Shipping on All Orders',
        description: 'Enjoy free shipping on all your purchases. No minimum order required!',
        price: 0,
        image: 'https://c4.wallpaperflare.com/wallpaper/868/234/504/clock-time-watch-zenith-wallpaper-preview.jpg',
        brand: 'Special Offer',
        category: 'Promotion',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        isFeatured: true
    },
    {
        name: 'Member Exclusive Deals',
        description: 'Join our membership program and unlock exclusive discounts and early access to sales!',
        price: 0,
        image: 'https://w0.peakpx.com/wallpaper/417/463/HD-wallpaper-zenith-fashion-watches.jpg',
        brand: 'Membership',
        category: 'Promotion',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        isFeatured: true
    },
    {
        name: 'MacBook Pro M2 Max',
        description: 'The most powerful MacBook Pro ever. Supercharged by M2 Pro and M2 Max, MacBook Pro takes its power and efficiency further than ever.',
        price: 2499.99,
        image: 'https://m.media-amazon.com/images/I/61eA9PkZ07L._SL1500_.jpg',
        brand: 'Apple',
        category: 'Electronics',
        countInStock: 10,
        rating: 4.9,
        numReviews: 128,
        isFeatured: false,
        todaysDeal: true,
        discountPercentage: 15
    },
    {
        name: 'Samsung QLED 4K Smart TV',
        description: 'Experience stunning 4K resolution with Quantum Dot technology and smart features for the ultimate viewing experience.',
        price: 1299.99,
        image: 'https://m.media-amazon.com/images/I/71LJJrKbezL._SL1500_.jpg',
        brand: 'Samsung',
        category: 'Electronics',
        countInStock: 12,
        rating: 4.8,
        numReviews: 156,
        isFeatured: false
    },
    {
        name: 'Adidas Ultraboost 22',
        description: 'Responsive cushioning and energy return for the perfect running experience.',
        price: 180.99,
        image: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ddaeba87f474345a1a55a8c5edddc5a_9366/Ultrarun_5_Running_Shoes_White_IE8786_04_standard.jpg',
        brand: 'Adidas',
        category: 'Footwear',
        countInStock: 25,
        rating: 4.8,
        numReviews: 145,
        isFeatured: false
    },
    {
        name: 'KitchenAid Stand Mixer',
        description: 'Professional-grade stand mixer with 10 speeds and multiple attachments for all your baking needs.',
        price: 399.99,
        image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTjvjRpQLWsaHbV5_miP8IrRQrJm7YH9n8t57GxQs2svdOoHWgq3OyaFDHomGqQypYNzwki_HacTZKpdiUy325m_4WE_G_FCzA13AkxlsybZQnMC9RUmUiCcA',
        brand: 'KitchenAid',
        category: 'Home & Kitchen',
        countInStock: 8,
        rating: 4.8,
        numReviews: 132,
        isFeatured: false,
        todaysDeal: true,
        discountPercentage: 25
    },
    {
        name: 'Sony PlayStation 5',
        description: 'Next-gen gaming console with ultra-high-speed SSD, haptic feedback, and 3D audio.',
        price: 499.99,
        image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT-aOUj_Pxb9PNck9AVC4MR4jUsReetlVmphgn6dxwELxYQqS3-2MRV4o34SvgxrfW1bQ3BidbRAoM4nMzUv13TTxv0cc6Uw3Ep8W2GvR2-kic_SyJq50xY',
        brand: 'Sony',
        category: 'Electronics',
        countInStock: 5,
        rating: 4.9,
        numReviews: 89,
        isFeatured: false,
        todaysDeal: true,
        discountPercentage: 20
    },
    {
        name: 'Nike Air Jordan 1',
        description: 'Iconic basketball sneakers with premium leather and classic design.',
        price: 170.99,
        image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSGLHzf2ffEw453H8TFlMNkhwnlb2CTpAHmFHBsEsncIZxmVaA4IBfUuTlHzy7vnQJB6kvVEF968PeftzeiOuOO78e2u-BmW0fwuIWUvxMKVCDR5TNjItSkUYw',
        brand: 'Nike',
        category: 'Footwear',
        countInStock: 15,
        rating: 4.7,
        numReviews: 203,
        isFeatured: false,
        todaysDeal: true,
        discountPercentage: 30
    },
    {
        name: 'Dyson Airwrap Complete',
        description: 'Revolutionary hair styling tool that styles and dries hair without extreme heat.',
        price: 599.99,
        image: 'https://m.media-amazon.com/images/I/71z7zty0XQL._SL1500_.jpg',
        brand: 'Dyson',
        category: 'Beauty',
        countInStock: 7,
        rating: 4.8,
        numReviews: 167,
        isFeatured: false
    },
    {
        name: 'Canon EOS R5',
        description: 'Professional mirrorless camera with 45MP full-frame sensor and 8K video capability.',
        price: 3899.99,
        image: 'https://m.media-amazon.com/images/I/71cSUQc9EJL._AC_SL1500_.jpg',
        brand: 'Canon',
        category: 'Electronics',
        countInStock: 6,
        rating: 4.9,
        numReviews: 78,
        isFeatured: false
    },
    {
        name: 'Rolex Submariner',
        description: 'Iconic luxury dive watch with automatic movement and 300m water resistance.',
        price: 8999.99,
        image: 'https://m.media-amazon.com/images/I/71cSUQc9EJL._AC_SL1500_.jpg',
        brand: 'Rolex',
        category: 'Accessories',
        countInStock: 3,
        rating: 4.9,
        numReviews: 45,
        isFeatured: false
    },
    {
        name: 'Tesla Model 3',
        description: 'Premium electric sedan with autopilot capabilities and 358-mile range.',
        price: 42990.00,
        image: 'https://m.media-amazon.com/images/I/71cSUQc9EJL._AC_SL1500_.jpg',
        brand: 'Tesla',
        category: 'Automotive',
        countInStock: 2,
        rating: 4.9,
        numReviews: 156,
        isFeatured: false
    },
    {
        name: 'iPhone 15 Pro Max',
        description: 'The most advanced iPhone ever with A17 Pro chip, titanium design, and revolutionary camera system.',
        price: 1199.99,
        image: 'https://m.media-amazon.com/images/I/71cSUQc9EJL._AC_SL1500_.jpg',
        brand: 'Apple',
        category: 'Electronics',
        countInStock: 15,
        rating: 4.8,
        numReviews: 95,
        isFeatured: false
    },
    {
        name: 'iPad Pro 12.9"',
        description: 'Supercharged by M2. With a next-level Apple Pencil experience and ProMotion technology.',
        price: 1099.99,
        image: 'https://m.media-amazon.com/images/I/71cSUQc9EJL._AC_SL1500_.jpg',
        brand: 'Apple',
        category: 'Electronics',
        countInStock: 8,
        rating: 4.7,
        numReviews: 82,
        isFeatured: false
    },
    {
        name: 'Sony WH-1000XM5 Headphones',
        description: 'Industry-leading noise cancellation with exceptional sound quality and comfortable design for all-day wear.',
        price: 399.99,
        image: 'https://m.media-amazon.com/images/I/71cSUQc9EJL._AC_SL1500_.jpg',
        brand: 'Sony',
        category: 'Electronics',
        countInStock: 20,
        rating: 4.9,
        numReviews: 234,
        isFeatured: false
    },
    {
        name: 'Nike Air Max 270',
        description: 'Iconic Air Max cushioning with a modern design for maximum comfort and style.',
        price: 150.99,
        image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSh8aya-QPI7DfRgIJ_5N_kcuvclG8P61ra9ne4d7muNbNlLFcwQmMDMa6JceYCNZOpCHlbqFgafrkTXNWRqU9lDJ7qSXE0VXrVvKaP5TkR6EAEZfmscOAugGo',
        brand: 'Nike',
        category: 'Footwear',
        countInStock: 30,
        rating: 4.7,
        numReviews: 189,
        isFeatured: false
    },
    {
        name: 'Levi\'s 501 Original Fit Jeans',
        description: 'Classic straight leg jeans with button fly and iconic Levi\'s quality.',
        price: 69.99,
        image: 'https://m.media-amazon.com/images/I/71cSUQc9EJL._AC_SL1500_.jpg',
        brand: 'Levi\'s',
        category: 'Clothing',
        countInStock: 50,
        rating: 4.6,
        numReviews: 278,
        isFeatured: false
    },
    {
        name: 'North Face Nuptse Jacket',
        description: 'Iconic puffer jacket with 700-fill goose down for maximum warmth and comfort.',
        price: 299.99,
        image: 'https://m.media-amazon.com/images/I/71cSUQc9EJL._AC_SL1500_.jpg',
        brand: 'The North Face',
        category: 'Clothing',
        countInStock: 15,
        rating: 4.9,
        numReviews: 167,
        isFeatured: false
    },
    {
        name: 'Dyson V15 Detect Vacuum',
        description: 'Powerful cordless vacuum with laser dust detection and advanced filtration system.',
        price: 699.99,
        image: 'https://m.media-amazon.com/images/I/71cSUQc9EJL._AC_SL1500_.jpg',
        brand: 'Dyson',
        category: 'Home & Kitchen',
        countInStock: 10,
        rating: 4.9,
        numReviews: 98,
        isFeatured: false
    },
    {
        name: 'Instant Pot Duo Plus',
        description: '9-in-1 multi-cooker that pressure cooks, slow cooks, rice cooks, steams, and more.',
        price: 129.99,
        image: 'https://m.media-amazon.com/images/I/71cSUQc9EJL._AC_SL1500_.jpg',
        brand: 'Instant Pot',
        category: 'Home & Kitchen',
        countInStock: 20,
        rating: 4.7,
        numReviews: 245,
        isFeatured: false
    },
    {
        name: 'Bose SoundLink Revolve+',
        description: '360-degree sound with deep, immersive audio and up to 16 hours of battery life.',
        price: 299.99,
        image: 'https://m.media-amazon.com/images/I/71cSUQc9EJL._AC_SL1500_.jpg',
        brand: 'Bose',
        category: 'Electronics',
        countInStock: 15,
        rating: 4.8,
        numReviews: 112,
        isFeatured: false
    },
    {
        name: "Samsung QLED 4K Smart TV",
        description: "Experience stunning 4K resolution with Quantum Dot technology and smart features",
        price: 1299.99,
        image: "https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg",
        brand: "Samsung",
        category: "Electronics",
        countInStock: 15,
        rating: 4.8,
        numReviews: 45,
        isFeatured: true,
        discountPercentage: 15
    },
    {
        name: "Sony WH-1000XM5 Headphones",
        description: "Industry-leading noise cancellation with exceptional sound quality",
        price: 399.99,
        image: "https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg",
        brand: "Sony",
        category: "Electronics",
        countInStock: 20,
        rating: 4.9,
        numReviews: 38,
        isFeatured: false,
        discountPercentage: 10
    },
    {
        name: "Bose SoundLink Revolve+ Speaker",
        description: "360-degree sound with deep, immersive bass and water-resistant design",
        price: 299.99,
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
        brand: "Bose",
        category: "Electronics",
        countInStock: 12,
        rating: 4.7,
        numReviews: 29,
        isFeatured: false,
        discountPercentage: 20
    },
    {
        name: "Nike Air Max 270",
        description: "Iconic Air Max cushioning with modern design and comfort",
        price: 150.00,
        image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
        brand: "Nike",
        category: "Footwear",
        countInStock: 25,
        rating: 4.6,
        numReviews: 42,
        isFeatured: false,
        discountPercentage: 25
    },
    {
        name: "Adidas Ultraboost 22",
        description: "Responsive Boost cushioning with Primeknit+ upper for ultimate comfort",
        price: 180.00,
        image: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg",
        brand: "Adidas",
        category: "Footwear",
        countInStock: 18,
        rating: 4.8,
        numReviews: 36,
        isFeatured: true,
        discountPercentage: 30
    },
    {
        name: "Levi's 501 Original Fit Jeans",
        description: "Classic straight leg jeans with button fly and iconic Levi's quality",
        price: 69.99,
        image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
        brand: "Levi's",
        category: "Clothing",
        countInStock: 30,
        rating: 4.5,
        numReviews: 28,
        isFeatured: false,
        discountPercentage: 15
    },
    {
        name: "North Face Nuptse Jacket",
        description: "Iconic puffer jacket with 700-fill goose down insulation",
        price: 299.99,
        image: "https://images.pexels.com/photos/1598506/pexels-photo-1598506.jpeg",
        brand: "The North Face",
        category: "Clothing",
        countInStock: 10,
        rating: 4.7,
        numReviews: 19,
        isFeatured: false,
        discountPercentage: 20
    },
    {
        name: "KitchenAid Stand Mixer",
        description: "Professional-grade stand mixer with 10 speeds and tilt-head design",
        price: 399.99,
        image: "https://images.pexels.com/photos/4397919/pexels-photo-4397919.jpeg",
        brand: "KitchenAid",
        category: "Home & Kitchen",
        countInStock: 8,
        rating: 4.9,
        numReviews: 47,
        isFeatured: true,
        discountPercentage: 15
    },
    {
        name: "Dyson V15 Detect Vacuum",
        description: "Laser dust detection and powerful suction for deep cleaning",
        price: 699.99,
        image: "https://images.pexels.com/photos/4397920/pexels-photo-4397920.jpeg",
        brand: "Dyson",
        category: "Home & Kitchen",
        countInStock: 6,
        rating: 4.8,
        numReviews: 32,
        isFeatured: false,
        discountPercentage: 10
    },
    {
        name: "Instant Pot Duo Plus",
        description: "9-in-1 pressure cooker with smart programs and easy-to-use interface",
        price: 129.99,
        image: "https://images.pexels.com/photos/4397921/pexels-photo-4397921.jpeg",
        brand: "Instant Pot",
        category: "Home & Kitchen",
        countInStock: 15,
        rating: 4.7,
        numReviews: 41,
        isFeatured: false,
        discountPercentage: 20
    },
    {
        name: "Apple iPad Pro 12.9",
        description: "M1 chip, Liquid Retina XDR display, and pro-level performance",
        price: 1099.99,
        image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg",
        brand: "Apple",
        category: "Electronics",
        countInStock: 12,
        rating: 4.9,
        numReviews: 56,
        isFeatured: true,
        discountPercentage: 10
    },
    {
        name: "Sony PlayStation 5",
        description: "Next-gen gaming console with ultra-high-speed SSD and ray tracing",
        price: 499.99,
        image: "https://images.pexels.com/photos/4522994/pexels-photo-4522994.jpeg",
        brand: "Sony",
        category: "Electronics",
        countInStock: 5,
        rating: 4.9,
        numReviews: 78,
        isFeatured: true,
        discountPercentage: 5
    },
    {
        name: "Nike Tech Fleece Joggers",
        description: "Lightweight, breathable fleece with tapered fit and zippered pockets",
        price: 80.00,
        image: "https://images.pexels.com/photos/1598504/pexels-photo-1598504.jpeg",
        brand: "Nike",
        category: "Clothing",
        countInStock: 20,
        rating: 4.6,
        numReviews: 34,
        isFeatured: false,
        discountPercentage: 15
    },
    {
        name: "Adidas Originals Trefoil Hoodie",
        description: "Classic hoodie with iconic Trefoil logo and comfortable fleece lining",
        price: 65.00,
        image: "https://images.pexels.com/photos/1598503/pexels-photo-1598503.jpeg",
        brand: "Adidas",
        category: "Clothing",
        countInStock: 25,
        rating: 4.5,
        numReviews: 29,
        isFeatured: false,
        discountPercentage: 20
    },
    {
        name: "Vitamix Professional Series 750",
        description: "Professional-grade blender with variable speed control and self-cleaning",
        price: 549.99,
        image: "https://images.pexels.com/photos/4397922/pexels-photo-4397922.jpeg",
        brand: "Vitamix",
        category: "Home & Kitchen",
        countInStock: 7,
        rating: 4.8,
        numReviews: 43,
        isFeatured: true,
        discountPercentage: 15
    }
];

const shoes = [
    {
        name: "Nike Air Force 1",
        description: "Classic white sneakers with iconic design",
        price: 110.00,
        image: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/3f3e7049-5c99-428c-abcd-e246b086f2ed/AIR+FORCE+1+%2707.png",
        brand: "Nike",
        category: "Footwear",
        countInStock: 20,
        rating: 4.8,
        numReviews: 45,
        isFeatured: false,
        discountPercentage: 10
    },
    {
        name: "Adidas Stan Smith",
        description: "Classic white leather sneakers with green heel tab",
        price: 95.00,
        image: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/29020568/2024/9/2/cbcbf00c-1d23-474d-b434-d7662e91eb3d1725268878228-ADIDAS-Originals-Men-Leather-Stan-Smith-Adv-Sneakers-1161725-1.jpg",
        brand: "Adidas",
        category: "Footwear",
        countInStock: 15,
        rating: 4.7,
        numReviews: 38,
        isFeatured: false,
        discountPercentage: 15
    },
    {
        name: "Puma RS-X",
        description: "Chunky sneakers with retro-inspired design",
        price: 120.00,
        image: "https://cdn-images.farfetch-contents.com/14/14/72/70/14147270_18767491_1000.jpg",
        brand: "Puma",
        category: "Footwear",
        countInStock: 12,
        rating: 4.6,
        numReviews: 29,
        isFeatured: false,
        discountPercentage: 20
    },
    {
        name: "New Balance 574",
        description: "Classic running-inspired lifestyle sneakers",
        price: 89.99,
        image: "https://image.goxip.com/I67EhXE1fmsdZiwWQvvCR8LRfeE=/fit-in/500x500/filters:format(jpg):quality(80):fill(white)/https:%2F%2Fimages.stockx.com%2Fimages%2FNew-Balance-574-Classic-Navy-Product.jpg",
        brand: "New Balance",
        category: "Footwear",
        countInStock: 18,
        rating: 4.7,
        numReviews: 42,
        isFeatured: false,
        discountPercentage: 10
    },
    {
        name: "Converse Chuck Taylor",
        description: "Iconic canvas sneakers with rubber toe cap",
        price: 65.00,
        image: "https://images.pexels.com/photos/1598511/pexels-photo-1598511.jpeg",
        brand: "Converse",
        category: "Footwear",
        countInStock: 25,
        rating: 4.5,
        numReviews: 36,
        isFeatured: false,
        discountPercentage: 15
    },
    {
        name: "Vans Old Skool",
        description: "Classic skate shoes with signature side stripe",
        price: 60.00,
        image: "https://images.pexels.com/photos/1598512/pexels-photo-1598512.jpeg",
        brand: "Vans",
        category: "Footwear",
        countInStock: 22,
        rating: 4.6,
        numReviews: 31,
        isFeatured: false,
        discountPercentage: 10
    },
    {
        name: "Reebok Classic",
        description: "Vintage-inspired leather sneakers",
        price: 75.00,
        image: "https://images.pexels.com/photos/1598513/pexels-photo-1598513.jpeg",
        brand: "Reebok",
        category: "Footwear",
        countInStock: 16,
        rating: 4.5,
        numReviews: 28,
        isFeatured: false,
        discountPercentage: 20
    },
    {
        name: "Fila Disruptor",
        description: "Chunky platform sneakers with retro style",
        price: 85.00,
        image: "https://images.pexels.com/photos/1598514/pexels-photo-1598514.jpeg",
        brand: "Fila",
        category: "Footwear",
        countInStock: 14,
        rating: 4.4,
        numReviews: 24,
        isFeatured: false,
        discountPercentage: 15
    }
];

const seedProducts = async () => {
    try {
        // Connect to MongoDB
        const conn = await connectDB();
        console.log('Connected to MongoDB');

        // Delete all products
        await Product.deleteMany({});
        console.log('Deleted all products');

        // Insert new products
        await Product.insertMany(products);
        await Product.insertMany(shoes);
        console.log('Products seeded successfully');

        // Close the connection
        await conn.connection.close();
        console.log('MongoDB connection closed');
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

// Check if -d flag is present for destroy
if (process.argv[2] === '-d') {
    const destroyData = async () => {
        try {
            const conn = await connectDB();
            await Product.deleteMany({});
            console.log('Data destroyed');
            await conn.connection.close();
            process.exit();
        } catch (error) {
            console.error('Error destroying data:', error);
            process.exit(1);
        }
    };
    destroyData();
} else {
    seedProducts();
} 