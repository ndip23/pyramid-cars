// server/seeder.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import data and models
const products = require('./data/products.js');
const Product = require('./models/Product.js');
const User = require('./models/User.js'); // Make sure to import the User model
const connectDB = require('./config/db.js');

// Load environment variables from .env file
dotenv.config();

// Connect to the database to perform operations
connectDB();

/**
 * Imports seed data into the database.
 * It first destroys all existing data in the User and Product collections,
 * then creates the admin user and inserts the product data.
 */
const importData = async () => {
    try {
        // --- 1. Clear existing data ---
        // This ensures we don't create duplicate data on re-runs.
        await Product.deleteMany();
        await User.deleteMany(); // WARNING: This will delete ALL users. Use with caution.
        
        console.log('✅ Previous User and Product data destroyed.');

        // --- 2. Create the Admin User from .env variables ---
        const adminUser = await User.create({
            username: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            confirmPassword: process.env.ADMIN_PASSWORD, // Must be provided to pass validation
            role: 'admin' // Explicitly set the role
        });

        console.log(`✅ Admin User '${adminUser.username}' created successfully.`);

        // --- 3. Insert product data ---
        // Note: The sample products don't have a user associated with them, which is fine.
        await Product.insertMany(products);
        console.log(`✅ ${products.length} products have been imported.`);
        
        console.log('\nData import complete!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error with data import: ${error}`);
        process.exit(1); // Exit with a failure code
    }
};

/**
 * Destroys all data in the User and Product collections.
 */
const destroyData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        
        console.log('✅ All User and Product data has been destroyed.');
        process.exit();
    } catch (error)
    {
        console.error(`❌ Error with data destruction: ${error}`);
        process.exit(1);
    }
};

// --- Command Line Logic ---
// This allows you to run `node seeder` to import or `node seeder -d` to destroy.
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}