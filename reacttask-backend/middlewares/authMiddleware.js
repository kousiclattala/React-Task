const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).json({
        msg: "You're not authorized",
      });
    }

    const token = req.header("Authorization").replace("Bearer ", "");

    if (token == "Bearer") {
      return res.status(404).json({
        msg: "You're not authorized",
      });
    }

    var decode = jwt.verify(token, "thisissecretfortoken");

    const user = await User.findById(decode.id);

    if (!user) {
      return res.status(404).json({
        msg: "You're not authorized",
      });
    }

    user.password = undefined;

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
      error,
    });
  }
};
