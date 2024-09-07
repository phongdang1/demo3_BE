require("dotenv").config();
import passport from "passport";

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const doLoginWithGoogle = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_APP_CLIENT_ID,
        clientSecret: process.env.GOOGLE_APP_CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URL,
      },
      function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
      }
    )
  );
};

export default doLoginWithGoogle;
