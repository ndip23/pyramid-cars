// server/controllers/carController.js
const Car = require('../models/Car.js');

// --- GET All Cars ---
const getAllCars = async (req, res) => {
    try {
        const { keyword, make, transmission, minPrice, maxPrice } = req.query;

        // Start building the query object
        const query = {};

        // 1. Keyword Search (searches make and model)
        if (keyword) {
            query.$or = [
                { make: { $regex: keyword, $options: 'i' } }, // 'i' for case-insensitive
                { model: { $regex: keyword, $options: 'i' } }
            ];
        }

        // 2. Filter by Make
        if (make) {
            query.make = make;
        }

        // 3. Filter by Transmission
        if (transmission) {
            query.transmission = transmission;
        }

        // 4. Filter by Price Range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) {
                query.price.$gte = Number(minPrice); // $gte = greater than or equal to
            }
            if (maxPrice) {
                query.price.$lte = Number(maxPrice); // $lte = less than or equal to
            }
        }
        
        // Find cars that are NOT sold
        query.isSold = false;

        const allCars = await Car.find(query).sort({ createdAt: -1 });
        
        // We can also get a list of all unique makes for our filter dropdown
        const makes = await Car.find().distinct('make');

        res.status(200).json({ cars: allCars, makes });
    } catch (error) {
        res.status(500).json({ message: "Error fetching cars", error: error.message });
    }
};

// --- CREATE a new Car ---
const createCar = async (req, res) => {
    try {
        const newCar = await Car.create(req.body);
        res.status(201).json(newCar);
    } catch (error) {
        res.status(400).json({ message: "Validation error creating car", error });
    }
};

// --- DELETE a Car ---
const deleteCar = async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        if (!deletedCar) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting car", error });
    }
};
const getCarById = async (req, res) => {
    try {
        const singleCar = await Car.findById(req.params.id);
        if (!singleCar) {
            return res.status(404).json({ message: "Car not found with that ID" });
        }
        res.status(200).json(singleCar);
    } catch (error) {
        res.status(500).json({ message: "Error fetching single car", error });
    }
};

// Note: GetById and Update can be added later if needed.

module.exports = {
    getAllCars,
    createCar,
    deleteCar,
    getCarById
};