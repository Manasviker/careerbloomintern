const express = require("express");
const router = express.Router();
const Resume = require("../Model/resume");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/resumes",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// router.post("/create", async (req, res) => {
router.post("/create", upload.single("resumeFile"), async (req, res) => {
  try {
    const resume = await Resume.create({
      ...req.body,
      resumeFile: req.file ? req.file.filename : "",
    });

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

router.get("/all", async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resumes" });
  }
});


module.exports = router;