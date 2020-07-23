const JWT = require("jsonwebtoken");
const { JWT_Secret } = require("../configueation/index");
const User = require("../models/user");

signToken = (newUser) => {
  return JWT.sign(
    {
      iss: "Tanjim",
      sub: newUser.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    JWT_Secret
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
    // Create a user
    const newUser = new User({
      email,
      password,
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
