const mongoose = require("mongoose");

const publicPostSchema = new mongoose.Schema({
  userEmail: String,
  caption: String,
  mediaUrl: String,
  mediaType: String, // photo or video
  friendCount: Number,
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      userEmail: String,
      comment: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  shares: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PublicPost", publicPostSchema);