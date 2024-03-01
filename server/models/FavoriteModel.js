const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  liked: {
    type: Boolean,
    default: false, // Initially, the favorite is not liked
  },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
