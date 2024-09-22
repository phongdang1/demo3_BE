const crypto = require("crypto");

const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const isOtpExpired = (expirationTime) => {
  return Date.now() > expirationTime;
};

module.exports = { generateOtp, isOtpExpired };
