const schedule = require("node-schedule");
import e from "express";
import db from "../models/index";
import getStringMailTemplate from "./mailTemplate";
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
let rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
// rule.hour = 8;
// rule.minute = 0;
// rule.second = 0;
// rule.tz = "Asia/Vientiane";
rule.second = 0; // Thực hiện vào giây đầu tiên của mỗi phút
rule.minute = new schedule.Range(0, 59, 1); // Cứ 2 phút một lần

let sendmail = async (mailTemplate, userMail) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_APP,
    to: userMail,
    subject: "Gợi ý việc làm cho bạn",
    html: mailTemplate,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
};

let getTemplateMail = async (infoUser) => {
  try {
    const timeStampOfTenDaysAgo = 10 * 24 * 60 * 60 * 1000;
    const currentDateString = new Date(
      Date.now() - timeStampOfTenDaysAgo
    ).toISOString();
    let listpost = await db.Post.findAll({
      limit: 5,
      // offset: 0,
      where: {
        timeEnd: {
          [Op.gt]: currentDateString,
        },
        statusCode: "active",
        [Op.or]: [
          db.Sequelize.where(
            db.sequelize.col("postDetailData.jobTypePostData.code"),
            {
              [Op.like]: `%congNghe%`,
            }
          ),
          db.Sequelize.where(
            db.sequelize.col("postDetailData.provincePostData.code"),
            {
              [Op.like]: `%KonTum%`,
            }
          ),
        ],
      },
      include: [
        {
          model: db.DetailPost,
          as: "postDetailData",
          attributes: {
            exclude: ["statusCode"],
          },
          include: [
            {
              model: db.Allcode,
              as: "jobTypePostData",
              attributes: ["value", "code"],
            },
            {
              model: db.Allcode,
              as: "workTypePostData",
              attributes: ["value", "code"],
            },
            {
              model: db.Allcode,
              as: "salaryTypePostData",
              attributes: ["value", "code"],
            },
            {
              model: db.Allcode,
              as: "jobLevelPostData",
              attributes: ["value", "code"],
            },
            {
              model: db.Allcode,
              as: "genderPostData",
              attributes: ["value", "code"],
            },
            {
              model: db.Allcode,
              as: "provincePostData",
              attributes: ["value", "code"],
            },
            {
              model: db.Allcode,
              as: "expTypePostData",
              attributes: ["value", "code"],
            },
          ],
        },
      ],
      order: db.sequelize.literal("rand()"),
      raw: true,
      nest: true,
    });
    if (listpost && listpost.length > 0) {
      for (let post of listpost) {
        let user = await db.User.findOne({
          where: { id: post.userId },
          attributes: {
            exclude: ["userId"],
          },
        });
        let company = await db.Company.findOne({
          where: { id: user.companyId },
        });
        post.companyData = company;
      }
      console.log(listpost);
      console.log(infoUser);
      return getStringMailTemplate(listpost, infoUser);
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const sendJobMail = () => {
  schedule.scheduleJob(rule, async function () {
    try {
      let listUserGetMail = await db.UserDetail.findAll({
        where: {
          isTakeMail: 1,
        },
        include: [
          {
            model: db.User,
            as: "UserDetailData",
            attributes: ["id", "firstName", "lastName", "image", "email"],
          },
        ],
        raw: true,
        nest: true,
      });
      for (let user of listUserGetMail) {
        let mailTemplate = await getTemplateMail(user);

        if (mailTemplate !== 0) {
          sendmail(mailTemplate, user.UserDetailData.email);
        }
      }
    } catch (error) {
      console.log(error);
    }
    console.log("đã gửi");
  });
};

module.exports = sendJobMail;
