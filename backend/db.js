const  mongoose= require("mongoose");
require('dotenv').config();
database=process.env.DATABASE_URL
const url=database
module.exports.connect=()=>(
    mongoose.connect(url,console.log("Database is connected"))
)

// const mongoose = require("mongoose");
// require("dotenv").config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connect };