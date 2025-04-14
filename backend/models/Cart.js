const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [cartItemSchema],
    total: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Calculate total when items change
cartSchema.methods.calculateTotal = async function() {
    const Product = mongoose.model('Product');
    let total = 0;

    for (const item of this.items) {
        const product = await Product.findById(item.product);
        if (product) {
            total += product.price * item.quantity;
        }
    }

    this.total = total;
    await this.save();
    return total;
};

// Add item to cart
cartSchema.methods.addItem = async function(productId, quantity = 1) {
    const existingItem = this.items.find(item => item.product.toString() === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        this.items.push({ product: productId, quantity });
    }

    await this.calculateTotal();
    return this;
};

// Update item quantity
cartSchema.methods.updateItemQuantity = async function(productId, quantity) {
    const item = this.items.find(item => item.product.toString() === productId);

    if (item) {
        if (quantity <= 0) {
            this.items = this.items.filter(item => item.product.toString() !== productId);
        } else {
            item.quantity = quantity;
        }
        await this.calculateTotal();
    }

    return this;
};

// Remove item from cart
cartSchema.methods.removeItem = async function(productId) {
    this.items = this.items.filter(item => item.product.toString() !== productId);
    await this.calculateTotal();
    return this;
};

// Clear cart
cartSchema.methods.clear = async function() {
    this.items = [];
    this.total = 0;
    await this.save();
    return this;
};

module.exports = mongoose.model('Cart', cartSchema); 