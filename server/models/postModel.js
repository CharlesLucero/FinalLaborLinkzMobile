const mongoose = require("mongoose");

//schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please add post title"],
    },
    description: {
      type: String,
      required: [true, "please add post description"],
    },
    postPics: {
      first: { type: String, default: null },
      second: { type: String, default: null },
      third: { type: String, default: null },
  },
    minRate: {
      type: String,
      required: [true, "please add post description"],
    },
    maxRate: {
      type: String,
      required: [true, "please add post description"],
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);