const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Register a new user
exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create new user
        const user = new User({
            name,
            email,
            password
        });

        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();

        res.json({ user, token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// Logout user
exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logout from all devices
exports.logoutAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.json({ message: 'Logged out from all devices' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get current user profile
exports.getProfile = async (req, res) => {
    res.json(req.user);
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, currentPassword, newPassword } = req.body;
        const user = req.user;

        // Check if email is being changed and if it's already taken
        if (email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        }

        // Update basic info
        user.name = name;
        user.email = email;

        // Update password if provided
        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }
            user.password = newPassword;
        }

        await user.save();

        // Remove sensitive data before sending response
        const userResponse = user.toObject();
        delete userResponse.password;
        delete userResponse.tokens;

        res.json(userResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user account
exports.deleteAccount = async (req, res) => {
    try {
        const { password } = req.body;
        const user = req.user;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password is incorrect' });
        }

        await user.remove();
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 