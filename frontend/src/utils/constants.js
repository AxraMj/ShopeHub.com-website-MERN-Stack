// Default image to use when no other fallbacks are available
export const DEFAULT_PRODUCT_IMAGE = '/images/placeholder-product.png';

// API base URL
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Image dimensions
export const PRODUCT_IMAGE_DIMENSIONS = {
    card: {
        width: 280,
        height: 280
    },
    detail: {
        width: 500,
        height: 500
    },
    thumbnail: {
        width: 80,
        height: 80
    }
};

// Categories
export const PRODUCT_CATEGORIES = [
    'Electronics',
    'Phones',
    'Laptops',
    'Accessories'
];

// Cart Constants
export const FREE_SHIPPING_THRESHOLD = 499;
export const SHIPPING_COST = 49;
export const TAX_RATE = 0.18; // 18% tax 