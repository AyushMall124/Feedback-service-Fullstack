const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

//Create a new instance of GoogleStrategy and pass it to the passport function to use for authentication
const User = mongoose.model("users");

//To create unique cookie for the web browser
//Works in the user pulled of the findOne() and passed into done()
//UserId != profile.id
//Assigned by mongoDB
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        //No need to make a new user
        done(null, existingUser);
      } else {
        //Make a class instance in the DB and then return a promise
        const user = await User({ googleId: profile.id }).save();

        done(null, user);
      }
    }
  )
);
