// chatController.js
const Chat = require('../models/chatModel');

const sendChat = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    const newChat = await Chat.create({ senderId, receiverId, message });
    res.status(201).json({ message: 'Chat sent successfully', data: newChat });
  } catch (error) {
    console.error('Error sending chat:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const fetchChats = async (req, res) => {
    const { userId } = req.params;
    const { receiverId } = req.query;

    try {
        const chats = await Chat.find({
            $or: [
                { senderId: userId, receiverId: receiverId },
                { senderId: receiverId, receiverId: userId }
            ]
        }).sort({ createdAt: 'asc' });
        res.json({ chats });
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { sendChat, fetchChats };
