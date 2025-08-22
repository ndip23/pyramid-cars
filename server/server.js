// server/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// Updated require paths
const connectDB = require('./config/db.js');
const productRoutes = require('./routes/productRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const carRoutes = require('./routes/carRoutes.js');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 8000;

// 1. Connect to Database
connectDB();

// 2. Configure Middleware
app.use(helmet()); // Security headers
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// 3. Define API Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/cars', carRoutes);

// 4. Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server is listening on port: ${PORT}`);
});