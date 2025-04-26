import User from '../models/User.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            const token = await user.generateAuthToken();
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                address: user.address,
                token,
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const token = await user.generateAuthToken();
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                address: user.address,
                token,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
export const logoutUser = async (req, res) => {
    try {
        // Remove the current token from the user's tokens array
        req.user.tokens = req.user.tokens.filter(tokenObj => tokenObj.token !== req.token);
        await req.user.save();
        
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Error during logout' });
    }
};

// @desc    Logout from all devices
// @route   POST /api/users/logoutAll
// @access  Private
export const logoutAll = async (req, res) => {
    try {
        // Remove all tokens from the user's tokens array
        req.user.tokens = [];
        await req.user.save();
        
        res.status(200).json({ message: 'Logged out from all devices successfully' });
    } catch (error) {
        console.error('Logout all error:', error);
        res.status(500).json({ message: 'Error during logout' });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                address: user.address,
                token: req.token
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            // Update address fields if provided
            if (req.body.address) {
                user.address = {
                    street: req.body.address.street || user.address?.street || '',
                    city: req.body.address.city || user.address?.city || '',
                    state: req.body.address.state || user.address?.state || '',
                    postalCode: req.body.address.postalCode || user.address?.postalCode || '',
                    country: req.body.address.country || user.address?.country || 'India',
                    phone: req.body.address.phone || user.address?.phone || ''
                };
            }

            if (req.body.currentPassword && req.body.newPassword) {
                const isMatch = await user.matchPassword(req.body.currentPassword);
                if (!isMatch) {
                    return res.status(400).json({ message: 'Current password is incorrect' });
                }
                user.password = req.body.newPassword;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                address: updatedUser.address,
                token: req.token
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}; 