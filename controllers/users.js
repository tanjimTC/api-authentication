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
    const foundLocalUser = await User.findOne({ "local.email": email }); //local
    const foundGoogleUser = await User.findOne({ "google.email": email }); //google
    // for nested property check in mongoose, we need to enclose the field within double quotes

    // check for existing local users
    if (foundLocalUser) {
      return res
        .status(403)
        .json({ Error: "User already with the same email exists" });
    }

    // check for existing google auth user
    if (foundGoogleUser) {
      return res
        .status(403)
        .json({ Error: "User already with the same email exists" });
    }

    // hash the password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPass = await bcrypt.hashSync(password, salt);

    // Create a user with hashed password
    const newUser = new User({
      method: "local",
      local: {
        email: email,
        password: hashedPass,
      },
    });
    await newUser.save();

    // Generate a token
    const token = signToken(newUser);

    // Response with a token
    res.status(200).json({ token });
  },

  signin: async (req, res, next) => {
    //   Generate token
    console.log("successfully logged in");
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  googleOAuth: async (req, res, next) => {
    // Generate token
    console.log("got here", req.user);
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secrets: async (req, res, next) => {
    console.log("protected files accessed");
    res.send("success");
  },
};
