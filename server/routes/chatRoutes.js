const { addMessage, getMessages } = require("../controllers/ChatController");
const { requireSignIn } = require("../controllers/userController");


const router = require("express").Router();

router.post('/addmsg', addMessage)
router.post('/getmsg', getMessages)

module.exports = router