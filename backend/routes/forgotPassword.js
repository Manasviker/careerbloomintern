const express = require("express");
const router = express.Router();
const ForgotPassword = require("../Model/forgotPassword");

function generatePassword(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let password = "";

  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return password;
}

router.post("/reset", async (req, res) => {
  try {
    const { email, phone } = req.body;

    const today = new Date().toISOString().split("T")[0];

    const alreadyUsed = await ForgotPassword.findOne({
      $or: [{ email }, { phone }],
      resetDate: today,
    });

    if (alreadyUsed) {
      return res.status(400).json({
        success: false,
        message: "You can use this option only once per day.",
      });
    }

    const newPassword = generatePassword();

    await ForgotPassword.create({
      email,
      phone,
      newPassword,
      resetDate: today,
    });

    res.status(200).json({
      success: true,
      message: "Password reset successful",
      newPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = router;