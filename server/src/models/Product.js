import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userName: String,
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a product name'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
        min: 0,
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
    },
    images: [{
        type: String,
    }],
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    reviews: [reviewSchema],
    featured: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Calculate average rating
productSchema.methods.calculateRating = function () {
    if (this.reviews.length === 0) {
        this.rating = 0;
    } else {
        const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
        this.rating = sum / this.reviews.length;
    }
};

const Product = mongoose.model('Product', productSchema);

export default Product;
