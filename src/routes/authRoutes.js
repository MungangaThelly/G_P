const express = require('express');
const { createUser } = require('../controllers/userController');  // Correctly import createUser
const authController = require('../controllers/authController');  // Correct path
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');  // Import middleware for token and admin verification
const router = express.Router();

// Route for login (authentication doesn't require a token)
router.post('/login', authController.login);

// Route for user registration (registration doesn't require token)
router.post('/register', authController.register);  // Fixed the typo here

// Route for user creation (perhaps this should be /admin/user if for admin use)
router.post('/user', createUser);  // Consider renaming to /admin/user if only for admins

// Secure route that requires a valid token (auth middleware checks JWT)
router.get('/secure', verifyToken, authController.secure);

// Admin-only route that requires admin privileges (checks token and admin status)
router.get('/admin-only', verifyToken, verifyAdmin, authController.adminOnly);

module.exports = router;

