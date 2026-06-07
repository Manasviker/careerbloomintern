const express = require("express");
const router = express.Router();
const useragent = require("express-useragent");
const LoginHistory = require("../Model/loginHistory");

router.use(useragent.express());

function getDeviceType(req) {
  if (req.useragent.isMobile) return "Mobile";
  if (req.useragent.isDesktop) return "Desktop";
  return "Laptop/Desktop";
}

router.post("/track-login", async (req, res) => {
  try {
    const { email, otpVerified } = req.body;

    const browser = req.useragent.browser;
    const os = req.useragent.os;
    const deviceType = getDeviceType(req);

    const ipAddress =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;

    const currentHour = new Date().getHours();

    // Mobile login allowed only 10 AM to 1 PM
    if (deviceType === "Mobile" && (currentHour < 10 || currentHour >= 13)) {
      await LoginHistory.create({
        email,
        browser,
        os,
        deviceType,
        ipAddress,
        loginStatus: "Blocked",
        reason: "Mobile login allowed only between 10:00 AM and 1:00 PM",
      });

      return res.status(403).json({
        success: false,
        message: "Mobile login is allowed only between 10:00 AM and 1:00 PM.",
      });
    }

    // Chrome login requires OTP
    if (browser === "Chrome" && !otpVerified) {
      await LoginHistory.create({
        email,
        browser,
        os,
        deviceType,
        ipAddress,
        loginStatus: "OTP Required",
        reason: "Chrome login requires OTP verification",
      });

      return res.status(401).json({
        success: false,
        otpRequired: true,
        message: "OTP verification required for Chrome login.",
      });
    }

    await LoginHistory.create({
      email,
      browser,
      os,
      deviceType,
      ipAddress,
      loginStatus: "Success",
      reason: "Login successful",
    });

    res.status(200).json({
      success: true,
      message: "Login tracked successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login tracking failed",
    });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const history = await LoginHistory.find({
      email: req.params.email,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch login history",
    });
  }
});

module.exports = router;