const express = require('express');
const router = express.Router();
const {
    sendApplication,
    acceptApplication,
    declineApplication
} = require('../controllers/HiringController');

// Route to send an application from user1 to user2
router.post('/send-application', sendApplication);

// Route for user2 to accept an application
router.put('/accept-application/:hiringProcessId', acceptApplication);

// Route for user2 to decline an application
router.put('/decline-application/:hiringProcessId', declineApplication);

module.exports = router;
