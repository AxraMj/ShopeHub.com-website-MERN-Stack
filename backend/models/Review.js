const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

// Update product ratings when a review is saved
reviewSchema.post('save', async function() {
    const Product = mongoose.model('Product');
    const product = await Product.findById(this.product);
    if (product) {
        await product.updateRatings();
    }
});

// Update product ratings when a review is removed
reviewSchema.post('remove', async function() {
    const Product = mongoose.model('Product');
    const product = await Product.findById(this.product);
    if (product) {
        await product.updateRatings();
    }
});

module.exports = mongoose.model('Review', reviewSchema); 