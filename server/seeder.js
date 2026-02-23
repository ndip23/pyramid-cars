// server/seeder.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import models
const User = require('./models/User.js'); 
const connectDB = require('./config/db.js');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const updateAdminCredentials = async () => {
    try {
        const newUsername = process.env.ADMIN_USERNAME;
        const newEmail = process.env.ADMIN_EMAIL;
        const newPassword = process.env.ADMIN_PASSWORD;

        if (!newEmail || !newPassword) {
            throw new Error("❌ Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env file");
        }

        console.log('🔄 Checking for existing Admin account...');

        // 1. Try to find an existing user with role 'admin'
        let adminUser = await User.findOne({ role: 'admin' });

        // 2. If no admin found by role, try finding by the email provided
        if (!adminUser) {
            adminUser = await User.findOne({ email: newEmail });
        }

        if (adminUser) {
            // --- UPDATE EXISTING ADMIN ---
            console.log(`found existing user: ${adminUser.email}`);
            
            adminUser.username = newUsername;
            adminUser.email = newEmail;
            
            // FIX: Set BOTH password and confirmPassword to pass validation
            adminUser.password = newPassword;
            adminUser.confirmPassword = newPassword; 
            
            adminUser.role = 'admin'; 
            
            await adminUser.save();
            console.log(`✅ Admin credentials updated successfully!`);
        } else {
            // --- CREATE NEW ADMIN ---
            console.log('No admin found. Creating new one...');
            await User.create({
                username: newUsername,
                email: newEmail,
                password: newPassword,
                confirmPassword: newPassword, // FIX: Added this line
                role: 'admin'
            });
            console.log(`✅ New Admin User created successfully: ${newEmail}`);
        }

        process.exit();
    } catch (error) {
        console.error(`❌ Error updating admin: ${error.message}`);
        process.exit(1); 
    }
};

updateAdminCredentials();