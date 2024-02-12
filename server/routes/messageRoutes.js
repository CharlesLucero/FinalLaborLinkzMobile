const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
  messageController,
  getAllMessagesController,
  getUserMessagesController,
  getChatListController,
} = require("../controllers/messageController");

const router = express.Router();

router.post('/create-new-message', requireSignIn, messageController);
router.get('/get-all-messages', requireSignIn, getAllMessagesController);
router.get('/get-chat-list', requireSignIn, getChatListController);
router.post('/api/v1/message/getusermessages/:otherUserId', requireSignIn, getUserMessagesController);

module.exports = router;
