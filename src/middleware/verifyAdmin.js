// adminMiddleware.js

const { users } = require('../domain/user_handler');  // Assuming you're using the in-memory `users` array

// Middleware to verify if the user is an admin
exports.verifyAdmin = async (req, res, next) => {
  try {
    const user = users.find((u) => u.id === req.user.id);  // Ensure `req.user.id` is set by the auth middleware

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin role required' });
    }

    next();
  } catch (err) {
    console.error('Error in verifyAdmin middleware:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
