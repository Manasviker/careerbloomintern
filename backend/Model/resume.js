const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  qualification: String,
  experience: String,
  personalInfo: String,
  photo: String,
  paymentId: String,
  orderId: String,
  status: {
    type: String,
    default: "paid",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resumeFile: {
  type: String,
},
});

module.exports = mongoose.model("Resume", resumeSchema);