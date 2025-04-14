export const products = {
    featured: {
        name: 'MacBook Pro M2 Max',
        description: 'The most powerful MacBook Pro ever. Supercharged by M2 Pro and M2 Max, MacBook Pro takes its power and efficiency further than ever.',
        price: 2499.99,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        brand: 'Apple',
        category: 'Electronics',
        countInStock: 10,
        rating: 4.9,
        numReviews: 128,
        isFeatured: true
    },
    regular: [
        {
            name: 'iPhone 15 Pro Max',
            description: 'The most advanced iPhone ever with A17 Pro chip, titanium design, and revolutionary camera system.',
            price: 1199.99,
            image: 'https://images.unsplash.com/photo-1695048133142-1a20484f7506?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
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
            image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2010&q=80',
            brand: 'Apple',
            category: 'Electronics',
            countInStock: 8,
            rating: 4.7,
            numReviews: 82,
            isFeatured: false
        },
        {
            name: 'AirPods Pro',
            description: 'Active Noise Cancellation, Transparency mode, and Spatial Audio with dynamic head tracking.',
            price: 249.99,
            image: 'https://images.unsplash.com/photo-1606220588911-5117d3a7a0d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            brand: 'Apple',
            category: 'Electronics',
            countInStock: 20,
            rating: 4.6,
            numReviews: 150,
            isFeatured: false
        },
        {
            name: 'Apple Watch Series 9',
            description: 'Advanced health features, Always-On Retina display, and powerful performance.',
            price: 399.99,
            image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            brand: 'Apple',
            category: 'Electronics',
            countInStock: 12,
            rating: 4.8,
            numReviews: 75,
            isFeatured: false
        }
    ],
    popular: [
        {
            id: 5,
            title: 'Ninja Foodi 9-in-1',
            description: 'Home & Kitchen • Multi-Cooker',
            price: '$229.99',
            image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'Home & Kitchen',
            rating: 4.8,
            reviews: 2341,
            stock: 45
        },
        {
            id: 6,
            title: 'Samsung QLED 4K TV',
            description: 'Electronics • 65" Smart TV',
            price: '$1299.99',
            image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'Electronics',
            rating: 4.9,
            reviews: 1567,
            stock: 30
        },
        {
            id: 7,
            title: 'Dyson V15 Detect',
            description: 'Home & Kitchen • Cordless Vacuum',
            price: '$749.99',
            image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'Home & Kitchen',
            rating: 4.7,
            reviews: 892,
            stock: 25
        },
        {
            id: 8,
            title: 'iPhone 14 Pro Max',
            description: 'Electronics • Smartphone',
            price: '$1099.99',
            image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'Electronics',
            rating: 4.9,
            reviews: 3241,
            stock: 85
        }
    ],
    heroBanner: {
        id: 'hero1',
        title: 'MacBook Pro M2 Max',
        description: 'The most powerful MacBook Pro ever',
        subtitle: 'Electronics • Apple • Latest Model • Limited Stock',
        price: '$2499.99',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        category: 'Electronics',
        rating: 5.0,
        reviews: 128,
        stock: 15
    }
}; 