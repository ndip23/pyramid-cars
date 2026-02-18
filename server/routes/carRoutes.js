// server/routes/carRoutes.js
const express = require('express');
const router = express.Router();
const { getAllCars, createCar, deleteCar, getCarById, updateCar } = require('../controllers/carController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

// --- PUBLIC ROUTE ---
// GET /api/cars
router.get('/', getAllCars);
router.get('/:id', getCarById);

// --- ADMIN-ONLY ROUTES ---
// POST /api/cars
router.post('/', protect, admin, createCar);
// DELETE /api/cars/:id
router.delete('/:id', protect, admin, deleteCar);
// PUT /api/cars/:id
router.put('/:id', protect, admin, updateCar);

module.exports = router;