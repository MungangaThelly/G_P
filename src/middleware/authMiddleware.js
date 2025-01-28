const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'Access denied, no token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // Attach decoded user data to the request
        next(); // Proceed to the next middleware
    } catch (err) {
        console.error('Token verification failed:', err); // Log error for debugging
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Middleware to verify if the user is an admin
const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied, admin role required.' });
    }

    next(); // Allow the request to proceed
};

// Flexible role-based verification middleware
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: `Access denied, requires one of the following roles: ${allowedRoles.join(', ')}` });
        }
        next(); // Proceed to the next middleware
    };
};

module.exports = { verifyToken, verifyAdmin, verifyRoles };

