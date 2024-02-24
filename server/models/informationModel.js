const mongoose = require("mongoose");

//schema
const informationSchema = new mongoose.Schema(
  {
    bio: {
      type: String,
      required: [true, "please add bio"],
    },
    age: {
      type: String,
      required: [true, "please add age"],
    },
    job: [
      {
        type: String,
        required: true,
      },
    ],
    address: {
      type: String,
      required: [true, "please add address"],
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Information", informationSchema);
