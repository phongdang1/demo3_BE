require("dotenv").config();
import passport from "passport";
import db from "../models/index";
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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
      clientID: process.env.GOOGLE_APP_CLIENT_ID,
      clientSecret: process.env.GOOGLE_APP_CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log("profile", profile);
      let dataRaw = {
        email: profile.emails[0].value,
      };

      let user = await db.User.findOne({
        where: { email: dataRaw.email },
        raw: true,
      });
      console.log("user", user);
      if (!user) {
        user = await db.User.create({
          email: dataRaw.email,
          password: "",
          firstName: "",
          lastName: "",
          address: "",
        });
      }
      return cb(null, user);
    }
  )
);

module.exports = passport;
