const express = require('express');
const Chat = require('../models/Chat');
const router = express.Router();

router.post('/send', async (req, res) => {
  const { message, sender, receiver } = req.body;
  try {
    const newChat = new Chat({ message, sender, receiver });
    await newChat.save();
    res.status(201).send('Message sent');
  } catch (error) {
    res.status(500).send('Error sending message');
  }
});

router.get('/history', async (req, res) => {
  const { userId, contactId } = req.query;
  try {
    const chatHistory = await Chat.find({
      $or: [
        { sender: userId, receiver: contactId },
        { sender: contactId, receiver: userId },
      ],
    }).sort({ timestamp: 1 });
    res.status(200).json(chatHistory);
  } catch (error) {
    res.status(500).send('Error fetching chat history');
  }
});

module.exports = router;
