// server/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- User Registration ---
const registerUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // Create user object (password will be hashed by pre-save hook)
        const user = new User({ username, email, password, confirmPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        // Handle validation errors or duplicate key errors
        res.status(400).json({ message: "Registration failed", error: error.message });
    }
};

// --- User Login ---
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 2. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 3. Create JWT payload
        // The payload for the token itself can remain lean.
        const payload = {
            id: user._id,
            username: user.username,
            role: user.role // <-- Include role in the token payload as well
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        // 4. Send the token AND the detailed user object back to the client
        res.status(200).json({
            message: "Login successful",
            token: token,
            // --- THIS IS THE CRUCIAL FIX ---
            // Send the user's role back so the frontend knows who they are.
            user: { 
                id: user._id, 
                username: user.username, 
                role: user.role 
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error during login", error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser
};