import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1']
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative']
    }
}, { _id: true });

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema],
    total: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Total cannot be negative']
    }
}, {
    timestamps: true
});

// Method to calculate total and clean up invalid items
cartSchema.methods.calculateTotal = async function() {
    let total = 0;
    const validItems = [];

    for (const item of this.items) {
        try {
            const product = await mongoose.model('Product').findById(item.product);
            if (!product) {
                console.log(`Product not found for item: ${item.product}`);
                continue;
            }
            // Update price if it has changed
            item.price = product.price;
            total += item.quantity * item.price;
            validItems.push(item);
        } catch (error) {
            console.error(`Error processing cart item: ${error.message}`);
        }
    }

    // Update items array to only include valid items
    this.items = validItems;
    this.total = total;
    return this.total;
};

// Pre-save middleware to ensure total is calculated
cartSchema.pre('save', async function(next) {
    try {
        await this.calculateTotal();
        next();
    } catch (error) {
        next(error);
    }
});

// Add item to cart
cartSchema.methods.addItem = async function(productId, quantity) {
    const Product = mongoose.model('Product');
    const product = await Product.findById(productId);
    
    if (!product) {
        throw new Error('Product not found');
    }

    if (product.countInStock < quantity) {
        throw new Error(`Only ${product.countInStock} items available`);
    }

    const existingItemIndex = this.items.findIndex(item => 
        item.product.toString() === productId.toString()
    );

    if (existingItemIndex !== -1) {
        const newQuantity = this.items[existingItemIndex].quantity + quantity;
        if (newQuantity > product.countInStock) {
            throw new Error(`Cannot add ${quantity} more items. Only ${product.countInStock - this.items[existingItemIndex].quantity} more available`);
        }
        this.items[existingItemIndex].quantity = newQuantity;
        this.items[existingItemIndex].price = product.price;
    } else {
        this.items.push({
            product: productId,
            quantity: quantity,
            price: product.price
        });
    }

    await this.calculateTotal();
    return this;
};

// Update item quantity
cartSchema.methods.updateItemQuantity = async function(productId, quantity) {
    const Product = mongoose.model('Product');
    const product = await Product.findById(productId);
    
    if (!product) {
        throw new Error('Product not found');
    }

    if (quantity > product.countInStock) {
        throw new Error('Not enough stock available');
    }

    const item = this.items.find(item => 
        item.product.toString() === productId.toString()
    );

    if (!item) {
        throw new Error('Item not found in cart');
    }

    item.quantity = quantity;
    item.price = product.price;
    await this.calculateTotal();
    return this;
};

// Remove item from cart
cartSchema.methods.removeItem = async function(productId) {
    const itemIndex = this.items.findIndex(item => 
        item.product.toString() === productId.toString()
    );

    if (itemIndex === -1) {
        throw new Error('Item not found in cart');
    }

    // Remove only the specific item
    this.items.splice(itemIndex, 1);
    await this.calculateTotal();
    return this;
};

// Clear cart
cartSchema.methods.clear = async function() {
    this.items = [];
    this.total = 0;
    return this;
};

const Cart = mongoose.model('Cart', cartSchema);

export default Cart; 