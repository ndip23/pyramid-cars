// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/productController.js'); // We can place it here for now
const { protect, admin } = require('../middleware/authMiddleware.js');

// GET /api/admin/stats
router.get('/stats', protect, admin, getDashboardStats);

module.exports = router;