const User = require("../models/user");

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
    // Create a user
    const newUser = new User({
      email,
      password,
    });
    await newUser.save();

    // Response with a token
    res.status(201).json({ user: "User Created" });
  },
  signin: async (req, res, next) => {
    //   Generate token
    console.log("userController.signin called");
  },
  secrets: async (req, res, next) => {
    console.log("userController.secrets called");
  },
};
