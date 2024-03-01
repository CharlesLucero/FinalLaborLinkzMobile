const Favorite = require("../models/FavoriteModel");
const User = require("../models/userModel");

// Add a favorite
const addFavorite = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    
    // Check if the favorite already exists
    const existingFavorite = await Favorite.findOne({ senderId, receiverId });
    if (existingFavorite) {
      return res.status(409).json({ error: "Favorite already exists" });
    }
    
    // Create and save the new favorite
    const favorite = new Favorite({ senderId, receiverId, liked: true }); // Set liked to true
    await favorite.save();
    
    res.status(201).json({ message: "Favorite added successfully", favorite });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Remove a favorite
const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    // Find the favorite by ID and update the liked field to false
    await Favorite.findByIdAndUpdate(id, { liked: false });
    res.json({ message: "Favorite removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllFavoriteUsers = async (req, res) => {
    const { userId } = req.params;

    try {

        const sentFavorites = await Favorite.find({ senderId: userId }).populate('receiverId');

        return res.status(200).json({ message: 'Sent favorites retrieved successfully.', data: sentFavorites });
    } catch (error) {
        console.error('Error retrieving sent applications:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { addFavorite, removeFavorite, getAllFavoriteUsers };
