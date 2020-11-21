const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { string } = require("joi");

// Create a schema

const userSchema = new Schema({
  method: {
    type: String,
    enum: ["google", "local", "facebook"],
    required: true,
  },
  local: {
    email: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
    },
  },
  google: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
  facebook: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
});

// userSchema.pre("save", async function (next) {
//   try {
//     // Generate a salt
//     const salt = await bcrypt.genSalt(10);
//     // Generate a password hash (salt+hash)
//     const passwordHash = await bcrypt.hash(this.password, salt);
//     // Re-assign the plain text password with the hashed password
//     this.password = passwordHash;
//   } catch (error) {
//     next(error);
//   }
// });

userSchema.methods.isValidPassword = async function (
  candidatePassword,
  hashedPassword
) {
  try {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  } catch (error) {
    throw new Error(error);
  }
};

// Create a model

const User = mongoose.model("user", userSchema);

// Export the model

module.exports = User;
