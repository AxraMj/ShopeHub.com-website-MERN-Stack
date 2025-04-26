import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
} from '../controllers/cartController.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Get user's cart
router.get('/', getCart);

// Add item to cart
router.post('/', addToCart);

// Update cart item quantity
router.put('/', updateCartItem);

// Remove item from cart
router.delete('/:productId', removeFromCart);

// Clear cart
router.delete('/', clearCart);

export default router; 