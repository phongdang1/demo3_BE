const passport = require("passport");

const googleAuthenticate = async (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  });
};

const googleAuthenticateCallback = async (req, res, next) => {
  passport.authenticate(
    "google",
    {
      failureRedirect: "/login",
      failureMessage: true,
    },
    async (error, user, info) => {
      if (error) {
        return res.status(500).json({
          message: "Internal server error",
          error: error,
        });
      }
      if (user) {
        try {
          return res.status(200).json({
            message: "Login success",
            user: user,
          });
        } catch (error) {
          return res.status(500).json({
            message: "Internal server error",
            error: error,
          });
        }
      }
    }
  )(req, res, next);
};

module.exports = {
  googleAuthenticate: googleAuthenticate,
  googleAuthenticateCallback: googleAuthenticateCallback,
};
