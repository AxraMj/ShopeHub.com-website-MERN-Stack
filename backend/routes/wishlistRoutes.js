import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist
} from '../controllers/wishlistController.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Get wishlist
router.get('/', getWishlist);

// Add to wishlist
router.post('/', addToWishlist);

// Remove from wishlist
router.delete('/:productId', removeFromWishlist);

// Clear wishlist
router.delete('/', clearWishlist);

export default router; 