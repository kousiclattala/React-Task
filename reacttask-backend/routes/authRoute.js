const express = require("express");
const {
  signup,
  signin,
  forgotPassword,
} = require("../controllers/authController");
const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signin);
route.post("/forgotpassword", forgotPassword);

module.exports = route;
