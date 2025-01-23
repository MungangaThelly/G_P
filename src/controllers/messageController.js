const mockConversations = require('../domain/message_handler.js');
const uuid = require('uuid');  // For generating unique message IDs

// Post a new message
exports.postMessage = (req, res) => {
  const { convId, content } = req.body;
  const sender = req.user.id; // Get user ID from JWT

  if (!convId || !content) {
    return res.status(400).json({ error: "convId & content must be included." });
  }

  const conversation = mockConversations.find(conv => conv.convId === convId);
  if (!conversation) {
    return res.status(404).json({ error: `Conversation with ID ${convId} not found.` });
  }

  const newMessage = {
    messageId: uuid.v4(),  // Generate a unique message ID
    sender,
    content,
    timestamp: new Date(),
  };

  conversation.messages.push(newMessage);
  res.status(201).json(conversation);
};

// Get messages for the authenticated user
exports.getMessages = (req, res) => {
  const userId = req.user.id;

  const userMessages = mockConversations.flatMap((conversation) => 
    conversation.messages.filter((message) => message.sender === userId)
  );

  if (userMessages.length === 0) {
    return res.status(404).json({ message: `No messages found for userId:${userId}` });
  }

  res.status(200).json(userMessages);
};

// Get conversations for the authenticated user
exports.getConversations = (req, res) => {
  const username = req.user.username;

  const userConversations = mockConversations.filter((conv) => 
    conv.participants.includes(username)
  );

  res.status(200).json({ conversations: userConversations.map((conv) => conv.convId) });
};

// Delete a message
exports.deleteMessage = (req, res) => {
  const { convId, messageId } = req.body;
  if (!convId || !messageId) {
    return res.status(400).json({ error: "convId and messageId must be provided" });
  }

  const conversation = mockConversations.find(conv => conv.convId === convId);
  if (!conversation) {
    return res.status(404).json({ error: `Conversation with ID ${convId} not found.` });
  }

  const messageIndex = conversation.messages.findIndex(msg => msg.messageId === messageId);
  if (messageIndex === -1) {
    return res.status(404).json({ error: `Message with ID ${messageId} not found.` });
  }

  conversation.messages.splice(messageIndex, 1); // Remove the message
  res.status(200).json({ message: `Message with ID ${messageId} deleted successfully.` });
};

// A sample handler function
exports.someHandler = (req, res) => {
  res.status(200).json({ message: 'This is the message handler' });
};
