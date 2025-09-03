// server/routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary.js');
const router = express.Router();

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    // Optional: Add file filter if needed
});

// The route is still POST /api/upload
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        // Multer gives us the file in a buffer. We need to convert it to a data URI
        // so Cloudinary can process it.
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: "pyramid_cars", // Optional: save files in a specific folder in Cloudinary
            resource_type: "auto"
        });

        // Send back the secure URL from Cloudinary
        res.status(200).json({
            message: "Image uploaded to Cloudinary successfully",
            image: result.secure_url // Use the secure, HTTPS URL
        });

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        res.status(500).json({ message: 'Something went wrong with the upload.', error });
    }
});

module.exports = router;