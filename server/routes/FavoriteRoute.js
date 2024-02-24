const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const { requireSignIn } = require("../controllers/userController");

// Add a favorite
router.post('/add', requireSignIn, favoriteController.addFavorite );

// Remove a favorite
router.delete('/:id', requireSignIn, favoriteController.removeFavorite );

// Get all users
router.get('/users', requireSignIn, favoriteController.getAllUsers);

module.exports = router;