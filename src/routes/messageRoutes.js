// src/routes/messageRoutes.js
const express = require('express');
const router = express.Router();

// Import your controller functions (e.g., getMessages, postMessage, etc.)
const messageController = require('../controllers/messageController');

// Define your routes properly
router.post('/messages', messageController.postMessage); // Example post route
router.get('/messages', messageController.getMessages); // Example get route

// Export the router to use in your app
module.exports = router;
