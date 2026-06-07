const express = require("express");
const router = express.Router();
const PublicPost = require("../Model/publicPost");

router.post("/create", async (req, res) => {
  try {
    const { userEmail, caption, mediaUrl, mediaType, friendCount } = req.body;

    if (friendCount === 0) {
      return res.status(400).json({
        success: false,
        message: "Users with no friends cannot post.",
      });
    }

    const today = new Date().toISOString().split("T")[0];

    const todayPosts = await PublicPost.find({
      userEmail,
      createdAt: {
        $gte: new Date(today),
      },
    });

    let limit = 0;

    if (friendCount === 1) limit = 1;
    else if (friendCount === 2) limit = 2;
    else if (friendCount > 10) limit = Infinity;
    else limit = 2;

    if (todayPosts.length >= limit) {
      return res.status(400).json({
        success: false,
        message: `You can post only ${limit} time(s) today.`,
      });
    }

    const post = await PublicPost.create({
      userEmail,
      caption,
      mediaUrl,
      mediaType,
      friendCount,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await PublicPost.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
});

router.put("/like/:id", async (req, res) => {
  try {
    const post = await PublicPost.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Like failed",
    });
  }
});

router.post("/comment/:id", async (req, res) => {
  try {
    const { userEmail, comment } = req.body;

    const post = await PublicPost.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            userEmail,
            comment,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Comment failed",
    });
  }
});

router.put("/share/:id", async (req, res) => {
  try {
    const post = await PublicPost.findByIdAndUpdate(
      req.params.id,
      { $inc: { shares: 1 } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Share failed",
    });
  }
});

module.exports = router;