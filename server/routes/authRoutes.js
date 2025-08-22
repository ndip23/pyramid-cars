// server/routes/authRoutes.js

const express = require('express');
const rateLimit = require('express-rate-limit'); // <-- IMPORT
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// --- CREATE A RATE LIMITER ---
// This will apply to all routes defined in this file.
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per window (every 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: { message: 'Too many login attempts from this IP, please try again after 15 minutes' },
});

// --- APPLY THE LIMITER TO THE ROUTES ---
// Now, any request to /register or /login will go through this limiter first.
router.post('/register', authLimiter, registerUser);
router.post('/login', authLimiter, loginUser);

module.exports = router;