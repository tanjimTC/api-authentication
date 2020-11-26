const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
// const GooglePlusTokenStrategy = require("passport-google-plus-token");
const GooglePlusTokenStrategy = require("passport-google-token").Strategy;
const User = require("./models/user");
require("dotenv").config();

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
        const user = await User.findOne({ "local.email": email });

        // if not,handle that
        if (!user) {
          return done(null, false);
        }

        // If user exists check if the password is correct
        const isMatch = await user.isValidPassword(
          password,
          user.local.password
        );

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

// google oAuth strategy

passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID:
        "272248706097-t1mr4b563opb7pkmelmfhnto0knv7mk6.apps.googleusercontent.com",
      clientSecret: "qqRCYdP6FB38NwG0x2-i4hqx",
      passReqToCallback: true,
    },
    async function (req, accessToken, refreshToken, profile, next) {
      try {
        // Should have full user profile over here
        console.log("profile", profile);
        // console.log("accessToken", accessToken);
        // console.log("refreshToken", refreshToken);

        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          console.log("exist");
          return next(null, existingUser);
        }

        const newUser = new User({
          method: "google",
          google: {
            id: profile.id,
            email: profile.emails[0].value,
          },
        });

        await newUser.save();
        console.log("doesnt new user");
        next(null, newUser);
      } catch (error) {
        next(error, false, error.message);
      }
    }
  )
);
