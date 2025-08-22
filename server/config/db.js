// server/config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const dbName = 'car-site'; // Change this to your database name

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`✅ Successfully connected to the database: ${dbName}`);
    } catch (err) {
        console.error(`❌ Failed to connect to the database: ${dbName}`, err);
        process.exit(1);
    }
};

module.exports = connectDB;