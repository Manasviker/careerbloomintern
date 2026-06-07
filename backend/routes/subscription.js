const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const Subscription = require("../Model/subscription");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const plans = {
  free: { amount: 0, limit: "1 internship/month" },
  bronze: { amount: 10000, limit: "3 internships/month" },
  silver: { amount: 30000, limit: "5 internships/month" },
  gold: { amount: 100000, limit: "unlimited" },
};

router.post("/create-order", async (req, res) => {
  try {
    const { plan } = req.body;

    const currentHour = Number(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        hour12: false,
      })
    );

    if (currentHour < 10 || currentHour >= 11) {
      return res.status(403).json({
        success: false,
        message: "Payments are allowed only between 10:00 AM and 11:00 AM IST.",
      });
    }

    if (plan === "free") {
      return res.status(200).json({
        success: true,
        free: true,
        message: "Free plan selected",
      });
    }

    const selectedPlan = plans[plan];

    const order = await razorpay.orders.create({
      amount: selectedPlan.amount,
      currency: "INR",
      receipt: `${plan}_subscription`,
    });

    res.status(200).json({
      success: true,
      order,
      planDetails: selectedPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
});

router.post("/save", async (req, res) => {
  try {
    const { email, plan, paymentId, orderId } = req.body;

    const selectedPlan = plans[plan];

    const subscription = await Subscription.create({
      email,
      plan,
      amount: selectedPlan.amount / 100,
      internshipLimit: selectedPlan.limit,
      paymentId,
      orderId,
      status: "active",
    });

    res.status(200).json({
      success: true,
      message: "Subscription saved successfully",
      subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Subscription save failed",
    });
  }
});

router.get("/:email", async (req, res) => {
  const subscription = await Subscription.findOne({
    email: req.params.email,
  }).sort({ createdAt: -1 });

  res.status(200).json(subscription);
});

module.exports = router;