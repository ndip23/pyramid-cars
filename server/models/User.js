// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [3, "Username must be at least 3 characters"],
        unique: true // No two users can have the same username
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        // Basic email format validation
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
    },
     role: {
        type: String,
        enum: ['user', 'admin'], // Role can only be one of these values
        default: 'user' // Default role for new users is 'user'
    }
}, { timestamps: true });

// Virtual field for password confirmation. It's not stored in the DB.
UserSchema.virtual('confirmPassword')
    .get(function() { return this._confirmPassword; })
    .set(function(value) { this._confirmPassword = value; });

// Pre-validation middleware to check if passwords match
UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords do not match');
    }
    next();
});

// Pre-save middleware to hash the password BEFORE it's saved to the DB
UserSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;