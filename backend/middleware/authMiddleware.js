import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    try {
        let token;
        
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Find user and include tokens array
            const user = await User.findById(decoded._id).select('-password');
            
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            // Verify token exists in user's tokens array
            const tokenExists = user.tokens.some(t => t.token === token);
            if (!tokenExists) {
                return res.status(401).json({ message: 'Token has been invalidated' });
            }

            req.token = token;
            req.user = user;
            next();
        } catch (error) {
            console.error('Token verification error:', error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as admin');
    }
};

export { protect, admin }; 