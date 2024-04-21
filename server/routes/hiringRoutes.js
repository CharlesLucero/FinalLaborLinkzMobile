const express = require('express');
const router = express.Router();
const {
    sendApplication,
    acceptApplication,
    declineApplication,
    getReceivedApplications,
    getSentApplications,
    doneApplication,
    cancelApplication,



} = require('../controllers/HiringController');
const { requireSignIn } = require('../controllers/userController');

// Route to send an application from user1 to user2
router.post('/send-application', requireSignIn, sendApplication);

router.post('/send-hire', requireSignIn, sendApplication);

// Route for user2 to accept an application
router.put('/accept-application/:hiringProcessId', requireSignIn, acceptApplication);

router.put('/done-application/:hiringProcessId', requireSignIn, doneApplication);

router.put('/cancel-application/:hiringProcessId', requireSignIn, cancelApplication);

// Route for user2 to decline an application
router.put('/decline-application/:hiringProcessId', requireSignIn, declineApplication);

router.get('/received-applications/:userId', requireSignIn, getReceivedApplications);

router.get('/sent-application', requireSignIn, sendApplication);

router.get('/sent-applications/:userId', requireSignIn, getSentApplications); 


module.exports = router;
