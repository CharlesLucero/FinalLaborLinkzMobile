const express = require("express");
const router = express.Router();

const { getAllFavoriteUsers, removeFavorite, addFavorite } = require("../controllers/favoriteController");
const { requireSignIn } = require("../controllers/userController");

// Add a favorite
router.post("/add", requireSignIn, addFavorite);

// Remove a favorite
router.delete("/:id", requireSignIn, removeFavorite);

// Get all users added as favorites by the current user
router.get("/favorite-users/:userId", requireSignIn, getAllFavoriteUsers );

module.exports = router;
