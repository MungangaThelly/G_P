<<<<<<< HEAD
const { postMessage, getMessages, getConversations } = require('../Controllers/messageController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', postMessage)
router.get('/', authMiddleware, getMessages)
router.get('/conversations', authMiddleware, getConversations)
//router.delete('/:msgId', deleteMessage)

module.exports = router;
=======
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
>>>>>>> 89d2f636acf73e4dd7498e9c88326f657ccc2d69
