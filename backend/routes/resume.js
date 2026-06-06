const express = require("express");
const router = express.Router();
const Resume = require("../Model/resume");

router.post("/create", async (req, res) => {
  try {
    const resume = await Resume.create(req.body);
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: "Resume save failed", error });
  }
});

router.get("/user/:email", async (req, res) => {
  try {
    const resumes = await Resume.find({ email: req.params.email }).sort({
      createdAt: -1,
    });

    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resumes", error });
  }
});
module.exports = router;