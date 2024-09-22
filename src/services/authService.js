import e from "express";
import db from "../models/index";
import { raw } from "body-parser";
const { generateOtp, isOtpExpired } = require("../utils/otpConfig");

var nodemailer = require("nodemailer");
let sendmail = (note, userMail = null) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_APP,
    to: userMail, // Địa chỉ email người nhận
    subject: "Mã xác thực OTP từ Job Finder",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mã xác thực OTP</title>
      </head>
      <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f2f2f2; margin: 0; padding: 0; color: #333; text-align: center;">
        <div style="background-color: #ffffff; max-width: 600px; margin: 40px auto; border: 1px solid #d0d0d0; border-radius: 12px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); padding: 30px; text-align: center;">
          <div style="background-color: #0056b3; color: #ffffff; padding: 20px; border-top-left-radius: 12px; border-top-right-radius: 12px;">
            <h1 style="margin: 0; font-size: 28px;">Job Finder</h1>
          </div>
          <div style="padding: 20px; line-height: 1.6;">
            <p>Xin chào,</p>
            <p>Đây là mã xác thực OTP của bạn: <strong>${note}</strong></p>
            <p>Mã OTP này có hiệu lực trong 5 phút. Vui lòng không chia sẻ mã này với bất kỳ ai khác.</p>
          </div>
          <div style="padding: 20px; text-align: center; font-size: 14px; color: #666; border-top: 1px solid #d0d0d0;">
            <p>Cảm ơn bạn đã sử dụng dịch vụ của Job Finder!</p>
            <p><a href="#" style="color: #0056b3; text-decoration: none; font-weight: 600;">Liên hệ với chúng tôi</a> | <a href="#" style="color: #0056b3; text-decoration: none; font-weight: 600;">Chính sách bảo mật</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
};
let otps = {};
let handleSendOtp = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let otp = generateOtp();
      let expirationTime = Date.now() + 3 * 60 * 1000;
      otps[email] = { otp, expirationTime };
      let note = otp;
      sendmail(note, email);
      resolve({
        errCode: 0,
        errMessage: "Send OTP successfully",
      });
    } catch (error) {
      reject(error);
    }
  });
};
let handleVerifyOtp = (email, otp) => {
  return new Promise(async (resolve, reject) => {
    try {
      const otpInfo = otps[email];

      // OTP không tồn tại
      if (!otpInfo) {
        return resolve({
          errCode: -1,
          errMessage: "OTP không tồn tại hoặc đã hết hạn",
        });
      }

      // OTP đã hết hạn
      if (isOtpExpired(otpInfo.expirationTime)) {
        delete otps[email]; // Xóa OTP đã hết hạn
        return resolve({
          errCode: -1,
          errMessage: "OTP đã hết hạn",
        });
      }

      // OTP không chính xác
      if (otpInfo.otp !== otp) {
        return resolve({
          errCode: -1,
          errMessage: "OTP không chính xác",
        });
      }

      // OTP đúng, cập nhật trạng thái xác thực của người dùng
      delete otps[email]; // Xóa OTP sau khi xác thực thành công

      // Tìm kiếm người dùng trong cơ sở dữ liệu
      let user = await db.User.findOne({
        where: { email: email },
        attributes: { exclude: ["userId"] },
        raw: false,
      });

      // Cập nhật trạng thái xác thực
      if (user) {
        user.isVerify = 1;
        await user.save();
        return resolve({
          errCode: 0,
          errMessage: "Xác thực OTP thành công",
        });
      } else {
        return resolve({
          errCode: -1,
          errMessage: "Người dùng không tồn tại",
        });
      }
    } catch (error) {
      reject({
        errCode: -2,
        errMessage: "Có lỗi xảy ra khi xử lý OTP",
        error: error.message,
      });
    }
  });
};

module.exports = {
  handleSendOtp: handleSendOtp,
  handleVerifyOtp: handleVerifyOtp,
};
