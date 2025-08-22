// server/server.js

const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();

// Import Database Connection
const connectDB = require('./config/db.js');

// Import Route Files
const productRoutes = require('./routes/productRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const carRoutes = require('./routes/carRoutes.js');

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 8000;

// 1. Connect to Database
connectDB();

// 2. Configure Middleware
app.use(helmet()); // Sets important security headers

// --- CORS Configuration ---
// This is critical for connecting your frontend to this backend in production.
const corsOptions = {
    // Replace 'YOUR_VERCEL_APP_URL.vercel.app' with your actual deployed frontend URL
    origin: [
        'http://localhost:3000', // For local development
        'https://pyramid-cars.vercel.app' // Example Vercel URL
    ],
    optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));

app.use(express.json()); // Allows the server to accept and parse JSON in request bodies

// 3. Serve Static Files
// This makes the 'uploads' folder publicly accessible
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// 4. Define API Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/cars', carRoutes);

// --- Optional: Basic Route for Root URL ---
app.get('/', (req, res) => {
    res.send('Pyramid Cars API is running...');
});

// 5. Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
});