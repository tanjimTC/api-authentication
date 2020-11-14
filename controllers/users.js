const JWT = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");

signToken = (newUser) => {
  return JWT.sign(
    {
      iss: "Tanjim",
      sub: newUser._id,
      iat: new Date().getTime(), //current time
      exp: new Date().setDate(new Date().getDate() + 1), //current time plus one day ahed
    },
    process.env.TOKEN_SECRET
  );
};

module.exports = {
  signup: async (req, res, next) => {
    const { email, password } = req.value.body;

    // Check if a user already exists with the same credentials
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res
        .status(403)
        .json({ Error: "User already with the same email exists" });
    }

    // hash the password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPass = await bcrypt.hashSync(password, salt);

    // Create a user with hashed password
    const newUser = new User({
      email,
      password: hashedPass,
    });
    await newUser.save();

    // Generate a token
    const token = signToken(newUser);

    // Response with a token
    res.status(200).json({ token });
  },

  signin: async (req, res, next) => {
    //   Generate token
    console.log("userController.signin called");
  },

  secrets: async (req, res, next) => {
    console.log("userController.secrets called");
  },
};
