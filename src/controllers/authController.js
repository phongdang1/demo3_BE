const passport = require("passport");
const crypto = require("crypto");
const authService = require("../services/authService");

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

let handleSendOtp = async (req, res) => {
  try {
    let data = await authService.handleSendOtp(req.body.email);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleVerifyOtp = async (req, res) => {
  try {
    let data = await authService.handleVerifyOtp(req.body.email, req.body.otp);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  googleAuthenticate: googleAuthenticate,
  googleAuthenticateCallback: googleAuthenticateCallback,
  handleSendOtp: handleSendOtp,
  handleVerifyOtp: handleVerifyOtp,
};
