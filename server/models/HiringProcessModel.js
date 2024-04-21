const mongoose = require("mongoose");

const HiringProcessSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined', 'done', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Define methods for handling application status
HiringProcessSchema.methods.accept = function() {
    this.status = 'accepted';
    return this.save();
};

HiringProcessSchema.methods.decline = function() {
    this.status = 'declined';
    return this.save();
};
HiringProcessSchema.methods.done = function() {
    this.status = 'done';
    return this.save();
};
HiringProcessSchema.methods.cancel = function() {
    this.status = 'cancelled';
    return this.save();
};

const HiringProcess = mongoose.model("HiringProcess", HiringProcessSchema);

module.exports = HiringProcess;

