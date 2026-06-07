const express = require("express");
const router = express.Router();
const admin = require("./admin");
require("dotenv").config();
// console.log("EMAIL USER:", process.env.EMAIL_USER);
// console.log("EMAIL PASS EXISTS:", !!process.env.EMAIL_PASS);

const intern = require("./internship");
const job = require("./job");
const application= require("./application");
const otp = require("./otp");
const paymentRoutes = require("./paymentRoutes");
const resume = require("./resume");
const publicSpace = require("./publicSpace");
const loginHistory = require("./loginHistory");
const subscription = require("./subscription");

router.use("/admin", admin);
router.use("/internship", intern);
router.use("/job", job);
router.use("/application", application);
router.use("/otp", otp);



router.use("/payment", paymentRoutes);

router.use("/resume", resume);

router.use("/public-space", publicSpace);

router.use("/login-history", loginHistory);

router.use("/subscription", subscription);

module.exports = router;

