import e from "express";
import db from "../models/index";
import bcrypt from "bcryptjs";
import CommonUtils from "../utils/CommonUtils";
const cloudinary = require("../utils/cloudinary");
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();
const { Op } = require("sequelize");
let nodemailer = require("nodemailer");

let sendMailToUser = (note, userMail, link = null) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_APP,
    to: userMail,
    subject: "Thông báo từ trang Job Finder",
    html: note,
  };
  if (link) {
    mailOptions.html =
      note +
      ` xem thông tin <a href='${process.env.URL_REACT}/${link}'>Tại đây</a> `;
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
    } else {
    }
  });
};

let checkUserPhoneNumber = (userPhoneNumber) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userPhoneNumber) {
        resolve({
          errCode: 2,
          errMessage: "Missing required fields",
        });
      } else {
        let user = await db.User.findOne({
          where: { phoneNumber: userPhoneNumber },
        });
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleHashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = "";
      if (password) {
        hashPassword = await bcrypt.hashSync(password, salt);
      }
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUsers = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.limit || !data.offset) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        let objectQuery = {
          limit: +data.limit,
          offset: +data.offset,
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.UserDetail,
              as: "UserDetailData",
              attributes: {
                exclude: ["userId", "createdAt", "updatedAt"],
              },
            },
          ],
          raw: true,
          nest: true,
        };
        if (data.searchKey) {
          objectQuery.where = {
            [Op.or]: [
              { firstName: { [Op.like]: `%${data.searchKey}%` } },
              { lastName: { [Op.like]: `%${data.searchKey}%` } },
              { phoneNumber: { [Op.like]: `%${data.searchKey}%` } },
            ],
          };
        }
        let result = await db.User.findAndCountAll(objectQuery);
        resolve({
          errCode: 0,
          errMessage: "Get all users succeed",
          data: result.rows ? result.rows : [],
          count: result.count ? result.count : 0,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getUsersById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        let result = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.UserDetail,
              as: "UserDetailData",
              attributes: {
                exclude: ["userId"],
              },
            },
          ],
          raw: true,
          nest: true,
        });
        if (result.UserDetailData.file) {
          try {
            result.UserDetailData.file = Buffer.from(
              result.UserDetailData.file,
              "base64"
            ).toString("binary");
          } catch (error) {
            console.log("Error decoding base64 file: ", error);
            result.UserDetailData.file = null;
          }
        }
        let listSkill = await db.UserSkill.findAll({
          where: { userId: userId },
          attributes: {
            exclude: ["UserId", "userId", "SkillId", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: db.Skill,
              as: "skillData",
              attributes: {
                exclude: ["createdAt", "updatedAt", "id"],
              },
            },
          ],
          raw: false,
        });
        result.listSkill = listSkill;
        resolve({
          errCode: 0,
          errMessage: "Get user by id succeed",
          data: result,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleCreateNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.phoneNumber || !data.password) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        let checkExist = await checkUserPhoneNumber(data.phoneNumber);
        if (checkExist) {
          resolve({
            errCode: 2,
            errMessage: "User's phone already exist",
          });
        } else {
          let imageUrl = "";
          let isHavePassword = true;
          if (!data.password) {
            data.password = `${new Date().getTime().toString()}@jobfinder`;
            isHavePassword = false;
          }
          let hashPassword = await handleHashUserPassword(data.password);
          if (data.image) {
            let uploadResponse = await cloudinary.uploader.upload(data.image, {
              upload_preset: "ml_default",
            });
            imageUrl = uploadResponse.url;
          }
          let newUser = await db.User.create({
            phoneNumber: data.phoneNumber,
            password: hashPassword,
            email: data.email ? data.email : null,
            firstName: data.firstName ? data.firstName : null,
            lastName: data.lastName ? data.lastName : null,
            address: data.address ? data.address : null,
            point: data.point ? data.point : 0,
            image: imageUrl ? imageUrl : null,
            dob: data.dob ? data.dob : null,
            roleCode: data.roleCode ? data.roleCode : "CANDIDATE",
            statusCode: data.statusCode ? data.statusCode : "ACTIVE",
            isUpdate: data.isUpdate ? data.isUpdate : 0,
            isVip: data.isVip ? data.isVip : 0,
            companyId: data.companyId ? data.companyId : null,
          });
          if (!isHavePassword) {
            let note = `<h3>Tài khoản đã tạo thành công</h3>
                                    <p>Tài khoản: ${data.phonenumber}</p>
                                    <p>Mật khẩu: ${data.password}</p>
                        `;
            sendMailToUser(note, data.email);
          }
          resolve({
            errCode: 0,
            errMessage: "Create user succeed",
            data: newUser,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
//handle login
let handleLogin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.phoneNumber || !data.password) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        let userData = {};
        let user = await db.User.findOne({
          where: {
            phoneNumber: data.phoneNumber,
          },
        });
        if (user) {
          let check = await bcrypt.compareSync(data.password, user.password);
          if (check) {
            if (user.statusCode === "ACTIVE") {
              userData.errMessage = "Login succeed";
              userData.errCode = 0;
              userData.data = user;
              userData.token = CommonUtils.encodeToken(user.id);
            } else {
              userData.errMessage = "User is not active";
              userData.errCode = 3;
            }
          } else {
            userData.errMessage = "Password or PhoneNumber is incorrect";
            userData.errCode = 2;
          }
        } else {
          userData.errMessage = "User is not exist";
          userData.errCode = 4;
        }
        resolve(userData);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllUsers: getAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleLogin: handleLogin,
  getUsersById: getUsersById,
};
