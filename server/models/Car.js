// server/models/Car.js
const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    make: { type: String, required: [true, "Make is required (e.g., Toyota)"] },
    model: { type: String, required: [true, "Model is required (e.g., Camry)"] },
    year: { type: Number, required: [true, "Year is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    mileage: { type: Number, required: [true, "Mileage is required"] },
    transmission: { type: String, enum: ['Automatic', 'Manual'], required: true },
    fuelType: { type: String, required: [true, "Fuel type is required (e.g., Petrol)"] },
    description: { type: String, required: [true, "Description is required"] },
    image: { type: String, required: [true, "Main image URL is required"] },
    // A gallery for more photos of the car
    imageGallery: [{ type: String }], 
    isSold: { type: Boolean, default: false }
}, { timestamps: true });

const Car = mongoose.model('Car', CarSchema);
module.exports = Car;