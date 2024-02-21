const express = require('express');
const router = express.Router();
const {
    sendApplication,
    acceptApplication,
    declineApplication,
    getReceivedApplications,
    getSentApplications,



} = require('../controllers/HiringController');
const { requireSignIn } = require('../controllers/userController');

// Route to send an application from user1 to user2
router.post('/send-application', requireSignIn, sendApplication);

// Route for user2 to accept an application
router.put('/accept-application/:hiringProcessId', requireSignIn, acceptApplication);

// Route for user2 to decline an application
router.put('/decline-application/:hiringProcessId', requireSignIn, declineApplication);

router.get('/received-applications/:userId', requireSignIn, getReceivedApplications);

router.get('/sent-application', requireSignIn, sendApplication);

router.get('/sent-applications/:userId', requireSignIn, getSentApplications); 

module.exports = router;
