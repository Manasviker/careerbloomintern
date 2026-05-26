const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

let generatedOTP = "";

router.post("/send-otp", async (req, res) => {

    const { email } = req.body;

    generatedOTP = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
         }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "CareerBloom French Language OTP",
        text: `Your OTP is ${generatedOTP}`
    };

    try {

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "OTP sent"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false
        });
    }
});

router.post("/verify-otp", (req, res) => {

    const { otp } = req.body;

    if (otp === generatedOTP) {

        res.status(200).json({
            success: true
        });

    } else {

        res.status(400).json({
            success: false,
            message: "Invalid OTP"
        });
    }
});

module.exports = router;