import express from 'express';
import { 
    getProducts, 
    getProductById, 
    createProduct,
    updateProduct,
    deleteProduct,
    getFeaturedProduct,
    getCategories,
    addReview,
    getProductsByCategory
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import auth from '../middleware/auth.js';
import { check } from 'express-validator';

const router = express.Router();

// Get all products and create product
router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct);

// Get featured product
router.get('/featured', getFeaturedProduct);

// Get all categories
router.get('/categories', getCategories);

// Get products by category
router.get('/category/:category', getProductsByCategory);

// Product reviews
router.post('/:id/reviews', protect, [
    check('rating', 'Rating is required').not().isEmpty(),
    check('rating', 'Rating must be between 1 and 5').isInt({ min: 1, max: 5 }),
    check('comment', 'Comment is required').not().isEmpty()
], addReview);

// Get, update and delete product by ID
router.route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

export default router; 