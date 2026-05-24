const express = require("express");
const router = express.Router();
const adminuser = "adminmanasvi ";
const adminpass = "virat1718";

router.post("/adminlogin", (req, res) => {
  const { username, password } = req.body;
  if (username === adminuser && password === adminpass) {
    res.send("admin is here");
  } else {
    res.send(401).send("unauthorized");
  }
});
module.exports = router;