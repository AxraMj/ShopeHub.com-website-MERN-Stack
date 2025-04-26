import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

// Get cart for current user
const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id })
            .populate('items.product', 'name price image countInStock');
        
        if (!cart) {
            cart = new Cart({
                user: req.user._id,
                items: [],
                total: 0
            });
            await cart.save();
        }
        
        res.status(StatusCodes.OK).json(cart);
    } catch (error) {
        throw new BadRequestError(error.message);
    }
};

// Add item to cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        
        if (!productId) {
            throw new BadRequestError('Please provide product ID');
        }

        // Validate product exists and has sufficient stock
        const product = await Product.findById(productId);
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        
        if (product.countInStock < quantity) {
            throw new BadRequestError(`Only ${product.countInStock} items available`);
        }

        let cart = await Cart.findOne({ user: req.user._id });
        
        if (!cart) {
            cart = new Cart({
                user: req.user._id,
                items: [],
                total: 0
            });
        }

        const existingItem = cart.items.find(item => 
            item.product.toString() === productId.toString()
        );

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (newQuantity > product.countInStock) {
                throw new BadRequestError(`Cannot add ${quantity} more items. Only ${product.countInStock - existingItem.quantity} more available`);
            }
            existingItem.quantity = newQuantity;
            existingItem.price = product.price;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                price: product.price
            });
        }

        await cart.calculateTotal();
        await cart.save();

        // Populate product details before sending response
        await cart.populate('items.product', 'name price image countInStock');
        
        res.status(StatusCodes.OK).json(cart);
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new BadRequestError(error.message);
        }
        throw error;
    }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;
    
    if (!productId || quantity === undefined) {
        throw new BadRequestError('Please provide product ID and quantity');
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        throw new NotFoundError('Cart not found');
    }

    const itemIndex = cart.items.findIndex(item => 
        item.product.toString() === productId
    );

    if (itemIndex === -1) {
        throw new NotFoundError('Item not found in cart');
    }

    if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        cart.items.splice(itemIndex, 1);
    } else {
        // Validate product exists and has sufficient stock
        const product = await Product.findById(productId);
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        
        if (product.countInStock < quantity) {
            throw new BadRequestError('Insufficient stock');
        }

        // Update quantity and price
        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].price = product.price;
    }

    await cart.calculateTotal();
    await cart.save();

    // Populate product details before sending response
    await cart.populate('items.product', 'name price images countInStock');
    
    res.status(StatusCodes.OK).json({ cart });
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        
        if (!productId) {
            throw new BadRequestError('Please provide product ID');
        }

        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            throw new NotFoundError('Cart not found');
        }

        // Find the item index
        const itemIndex = cart.items.findIndex(item => 
            item.product.toString() === productId
        );

        if (itemIndex === -1) {
            throw new NotFoundError('Item not found in cart');
        }

        // Remove only the specific item
        cart.items.splice(itemIndex, 1);
        
        // Recalculate total
        await cart.calculateTotal();
        await cart.save();

        // Populate product details before sending response
        await cart.populate('items.product', 'name price image countInStock');
        
        res.status(StatusCodes.OK).json(cart);
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new BadRequestError(error.message);
        }
        throw error;
    }
};

// Clear cart
const clearCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            throw new NotFoundError('Cart not found');
        }

        // Clear all items
        cart.items = [];
        cart.total = 0;
        await cart.save();
        
        res.status(StatusCodes.OK).json(cart);
    } catch (error) {
        throw new BadRequestError(error.message);
    }
};

export {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
}; 