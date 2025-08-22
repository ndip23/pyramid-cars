// server/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getAllProducts, 
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController.js');
const { protect, admin } = require('../middleware/authMiddleware.js'); // <-- Import middleware

// --- PUBLIC ROUTES ---
// Anyone can view products
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// --- ADMIN-ONLY ROUTES ---
// To access these, user must have a valid token AND have the role 'admin'
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;