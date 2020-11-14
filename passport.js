const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();
const User = require("./models/user");

// Json web token Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: process.env.TOKEN_SECRET,
    },
    async (payload, done) => {
      try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // If user doesn't exists, handle it
        if (!user) {
          return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// Local Strategy

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        // Find the user given the email
        const user = await User.findOne({ email });

        // if not,handle that
        if (!user) {
          return done(null, false);
        }

        // If user exists check if the password is correct
        const isMatch = await user.isValidPassword(password, user.password);

        // If not handle it
        if (!isMatch) {
          return done(null, false);
        }

        // otherwise return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
