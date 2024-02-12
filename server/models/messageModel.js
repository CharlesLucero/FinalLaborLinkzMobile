// models/messageModel.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    receiver: String,
    content: String,
    messageBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
