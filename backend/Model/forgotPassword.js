const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema({
  email: String,
  phone: String,
  newPassword: String,
  resetDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ForgotPassword", forgotPasswordSchema);