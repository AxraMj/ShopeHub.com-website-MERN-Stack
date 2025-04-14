const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Register route
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
    ],
    authController.register
);

// Login route
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    authController.login
);

// Protected routes
router.post('/logout', auth, authController.logout);
router.post('/logout-all', auth, authController.logoutAll);
router.get('/profile', auth, authController.getProfile);

// Profile update route
router.put(
    '/profile',
    [
        auth,
        [
            check('name', 'Name is required').not().isEmpty(),
            check('email', 'Please include a valid email').isEmail(),
            check('currentPassword', 'Current password is required when changing password')
                .if(check('newPassword').exists())
                .notEmpty(),
            check('newPassword', 'New password must be at least 6 characters')
                .if(check('currentPassword').exists())
                .isLength({ min: 6 })
        ]
    ],
    authController.updateProfile
);

// Account deletion route
router.delete(
    '/profile',
    [
        auth,
        check('password', 'Password is required').not().isEmpty()
    ],
    authController.deleteAccount
);

module.exports = router; 