const mongoose = require("mongoose");

const loginHistorySchema = new mongoose.Schema({
  email: String,
  browser: String,
  os: String,
  deviceType: String,
  ipAddress: String,
  loginStatus: String,
  reason: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LoginHistory", loginHistorySchema);