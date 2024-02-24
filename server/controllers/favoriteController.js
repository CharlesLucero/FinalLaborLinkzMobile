const User = require('../models/userModel');
const Favorite = require('../models/favoritesModel');

// Add a favorite
const addFavorite = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const existingFavorite = await Favorite.findOne({ senderId, receiverId });
    if (existingFavorite) {
      return res.status(400).json({ error: 'Favorite already exists' });
    }
    const favorite = new Favorite({ senderId, receiverId });
    await favorite.save();
    res.status(201).json({ message: 'Favorite added successfully', favorite });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove a favorite
const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    await Favorite.findByIdAndDelete(id);
    res.json({ message: 'Favorite removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addFavorite, removeFavorite, getAllUsers };