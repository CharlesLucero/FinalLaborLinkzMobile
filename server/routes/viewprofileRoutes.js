const express = require('express');
const { getUserProfileDataController } = require('../controllers/viewProfileController');
const router = express.Router();


// Route to get user profile data by user ID
router.get('/users/:userId/profile', getUserProfileDataController );

module.exports = router;
