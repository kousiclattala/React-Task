const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body;

    // checking whether email, password & phonenumber are present in the req or not.
    if (!email || !password || !phoneNumber) {
      return res.status(400).json({
        msg: "Please send email, password & phone number",
      });
    }

    // querying the db with the email id, whether he is a registered user.
    const isUser = await User.findOne({ email });

    if (!isUser) {
      const user = await User.create({
        email,
        password,
        phoneNumber,
      });

      const token = user.generateToken();
      user.password = undefined;

      res.status(200).json({
        msg: "Registered successfully",
        user,
        token,
      });
    } else {
      return res.status(400).json({
        msg: "Please login with registered account",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
      error,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if no email or password is present in the req, then we raise a error
    if (!email || !password) {
      return res.status(400).json({
        msg: "Please send email & password",
      });
    }

    // querying the db with the given email
    const user = await User.findOne({ email });

    // if no user found, then we ask user to register first
    if (!user) {
      return res.status(404).json({
        msg: "Please register first with the email id",
      });
    }

    //if user present, then we are comparing the password sent in the query
    // against the password stored in our db
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // if didn't match raise an exception
    if (!isPasswordCorrect) {
      return res.status(401).json({
        msg: "Email or Password is incorrect",
      });
    }

    // if matches, then generate token and mark the password field to undefined
    // so that it will not be send in the res.
    const token = user.generateToken();
    user.password = undefined;

    res.status(200).json({
      msg: "Logged in success",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
      error,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking email or password are present, if not raise exception
    if (!email || !password) {
      return res.status(404).json({
        msg: "Please send email id & password",
      });
    }

    // querying the db with the email
    const user = await User.findOne({ email });

    // if no user found, raise an exception
    if (!user) {
      return res.status(404).json({
        msg: "You're not registered with us",
      });
    }

    //if user found, change the password stored in our db with the password
    //sent through request
    user.password = password;

    //save the user to db, before saving the user, the password field is converted
    //into hash, with the help of method we written in the model.
    await user.save({ validateBeforeSave: false });

    //generate the token and mark password as undefined, so it will not be sent
    //in the response.
    const token = user.generateToken();
    user.password = undefined;

    res.status(200).json({
      msg: "Password updated successfully",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
      error,
    });
  }
};
