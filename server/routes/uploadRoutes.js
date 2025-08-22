// server/routes/uploadRoutes.js

const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware.js'); // <-- IMPORT THE PROTECT MIDDLEWARE

// ... (storage and checkFileType functions are unchanged) ...
const storage = multer.diskStorage({
    destination(req, file, cb) { cb(null, 'uploads/'); },
    filename(req, file, cb) { cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); }
});

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb(new Error('Images Only! (jpeg, jpg, png, gif)'));
    }
}

const upload = multer({ storage, fileFilter: function(req, file, cb) { checkFileType(file, cb); }});

// --- UPDATE THE UPLOAD ROUTE TO BE PROTECTED ---
// The `protect` middleware will run first. If the user is not logged in,
// the request will be rejected before it even reaches the upload logic.
router.post('/', protect, (req, res) => {
    const uploader = upload.single('image');

    uploader(req, res, function (err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file selected' });
        }
        res.status(201).send({
            message: 'Image Uploaded Successfully',
            image: `/${req.file.path.replace(/\\/g, "/")}`
        });
    });
});

module.exports = router;