const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    reportedUserId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    },
    violation: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    reportedBy:{
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    }
 },
 { timestamps: true }
 );

module.exports = mongoose.model("Report", reportSchema);
