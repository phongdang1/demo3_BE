require("dotenv").config();
import passport from "passport";
import db from "../models/index";

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const doLoginWithGoogle = () => {
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
        let dataRaw = {
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        };
        let user = await db.User.findOne({
          where: { email: dataRaw.email },
          raw: true,
        });
        if (!user) {
          user = await db.User.create({
            email: dataRaw.email,
            password: "",
            firstName: dataRaw.firstName,
            lastName: dataRaw.lastName,
            address: "",
          });
        }
        return cb(null, user);
      }
    )
  );
};

export default doLoginWithGoogle;
