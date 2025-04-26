import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

// Get wishlist for current user
const getWishlist = async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ user: req.user._id })
            .populate('products', 'name price image brand category rating numReviews');
        
        if (!wishlist) {
            wishlist = new Wishlist({
                user: req.user._id,
                products: []
            });
            await wishlist.save();
        }
        
        res.status(StatusCodes.OK).json(wishlist);
    } catch (error) {
        throw new BadRequestError(error.message);
    }
};

// Add product to wishlist
const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        
        if (!productId) {
            throw new BadRequestError('Please provide product ID');
        }

        // Validate product exists
        const product = await Product.findById(productId);
        if (!product) {
            throw new NotFoundError('Product not found');
        }

        let wishlist = await Wishlist.findOne({ user: req.user._id });
        
        if (!wishlist) {
            wishlist = new Wishlist({
                user: req.user._id,
                products: []
            });
        }

        await wishlist.addProduct(productId);
        await wishlist.save();

        // Populate product details before sending response
        await wishlist.populate('products', 'name price image brand category rating numReviews');
        
        res.status(StatusCodes.OK).json(wishlist);
    } catch (error) {
        throw new BadRequestError(error.message);
    }
};

// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        
        if (!productId) {
            throw new BadRequestError('Please provide product ID');
        }

        let wishlist = await Wishlist.findOne({ user: req.user._id });
        if (!wishlist) {
            throw new NotFoundError('Wishlist not found');
        }

        await wishlist.removeProduct(productId);
        await wishlist.save();

        // Populate product details before sending response
        await wishlist.populate('products', 'name price image brand category rating numReviews');
        
        res.status(StatusCodes.OK).json(wishlist);
    } catch (error) {
        throw new BadRequestError(error.message);
    }
};

// Clear wishlist
const clearWishlist = async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ user: req.user._id });
        if (!wishlist) {
            throw new NotFoundError('Wishlist not found');
        }

        wishlist.products = [];
        await wishlist.save();
        
        res.status(StatusCodes.OK).json(wishlist);
    } catch (error) {
        throw new BadRequestError(error.message);
    }
};

export {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist
}; 