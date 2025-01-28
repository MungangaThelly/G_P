const { postMessage, getMessages, getConversations } = require('../Controllers/messageController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', postMessage)
router.get('/', authMiddleware, getMessages)
router.get('/conversations', authMiddleware, getConversations)
//router.delete('/:msgId', deleteMessage)

module.exports = router;