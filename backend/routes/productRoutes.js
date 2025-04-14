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

// Public routes
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:id', getProductById);
router.get('/category/:category', getProductsByCategory);

// Protected routes
router.post(
    '/:id/reviews',
    [
        auth,
        [
            check('rating', 'Rating is required').not().isEmpty(),
            check('rating', 'Rating must be between 1 and 5').isInt({ min: 1, max: 5 }),
            check('comment', 'Comment is required').not().isEmpty()
        ]
    ],
    addReview
);

// Get featured product for banner
router.get('/featured', getFeaturedProduct);

// Other routes
router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct);

router.route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

export default router; 