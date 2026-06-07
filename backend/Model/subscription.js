const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  email: String,
  plan: String,
  amount: Number,
  internshipLimit: String,
  paymentId: String,
  orderId: String,
  status: {
    type: String,
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);