const mockConversations = require('../domain/message_handler.js');

//todo: ändra så att userId används som sender
exports.postMessage = (req, res) => {
   const { sender, convId, content } = req.body;
   if (!sender || !convId || !content) {
      return res.status(400).json({ error:"sender, convId & content must be included." });
   }

   const conversation = mockConversations.find(conv => conv.convId === convId);
   const newMessage = {
      sender,
      content,
      timestamp: new Date(),
     };
     conversation.messages.push(newMessage);
     res.status(201).json(conversation);
}

exports.getMessages = (req, res) => {
   const userId = req.user.Id; //antar att det kommer från jwt eee wat
   const userMessages = mockConversations.flatMap((conversation) => 
      conversation.messages.filter((message) => message.sender === userId)
   );
   if (userMessages.length === 0) {
      return res.status(404).json({ message: `No messages found for userId:${userId}`});
   }
   res.status(200).json(userMessage);
}

exports.getConversations = (req, res) => {
   const username = req.user.username; //antar att det kommer från jwt
   const userConversations = mockConversations.filter((conv) => 
      conv.participants.includes(username)
   );
   res.status(200).json({ conversations: userConversations.map((conv) => conv.convId) });
}

exports.deleteMessage = (req, res) => {
   
}
