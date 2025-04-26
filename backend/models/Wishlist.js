import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
}, {
    timestamps: true
});

// Method to add product to wishlist
wishlistSchema.methods.addProduct = async function(productId) {
    if (!this.products.includes(productId)) {
        this.products.push(productId);
    }
    return this;
};

// Method to remove product from wishlist
wishlistSchema.methods.removeProduct = async function(productId) {
    this.products = this.products.filter(id => id.toString() !== productId.toString());
    return this;
};

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist; 