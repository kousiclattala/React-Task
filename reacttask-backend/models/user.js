const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, "Please send password"],
    minlength: [6, "Password must be of minimum 6 characters long"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please send mobile number"],
    maxlength: [10, "Phone number must not be 10 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//creating the encrypted password before saving the user, using mongoose inbuilt methods.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

//creating token by using jwt, here secret should be kept in env file.
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id }, "thisissecretfortoken", {
    expiresIn: "3 days",
  });

  return token;
};

module.exports = mongoose.model("User", userSchema);
