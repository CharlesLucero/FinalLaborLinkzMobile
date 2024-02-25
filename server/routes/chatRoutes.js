// chatRoutes.js
const express = require('express');
const router = express.Router();
const { sendChat, fetchChats } = require('../controllers/ChatController');
const { requireSignIn } = require('../controllers/userController');

router.post('/send', requireSignIn, sendChat);
router.get('/:userId', requireSignIn, fetchChats);

module.exports = router;
