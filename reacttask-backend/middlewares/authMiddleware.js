const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = async (req, res, next) => {
  try {
    //if authorization is not found in headers, we raise exception
    if (!req.header("Authorization")) {
      return res.status(401).json({
        msg: "You're not authorized",
      });
    }

    //if authorization present, we extract token from it.
    const token = req.header("Authorization").replace("Bearer ", "");

    //if no token is present, we raise exception
    if (token == "Bearer") {
      return res.status(404).json({
        msg: "You're not authorized",
      });
    }

    //verifying the token with the secret, here secret should be kept in env file.
    var decode = jwt.verify(token, "thisissecretfortoken");

    //getting the user from the decoded token.
    const user = await User.findById(decode.id);

    //if no user found, we raise exception.
    if (!user) {
      return res.status(404).json({
        msg: "You're not authorized",
      });
    }

    //not sending the password to frontend
    user.password = undefined;

    //attaching the user to req object, so that can be accessed by other middlewares.
    req.user = user;

    //handling the req to next middleware.
    next();
  } catch (error) {
    //if error occurs, we raise exception.
    return res.status(500).json({
      msg: "Server error",
      error,
    });
  }
};
