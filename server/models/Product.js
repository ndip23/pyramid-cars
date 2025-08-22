// server/models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Product name is required"],
        minlength: [3, "Product name must be at least 3 characters long"]
    },
    price: { 
        type: Number, 
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"]
    },
    image: { 
        type: String, 
        required: [true, "Image URL is required"]
    },
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 450 },
    category: { type: String, required: true },
    isNew: { type: Boolean, default: false },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;