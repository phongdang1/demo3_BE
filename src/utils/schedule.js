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
rule.minute = new schedule.Range(0, 59, 1); // Cứ 1 phút một lần

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
      where: {
        timeEnd: {
          [Op.gt]: currentDateString,
        },
        statusCode: "APPROVED",
        [Op.and]: [
          db.Sequelize.where(
            db.sequelize.col("postDetailData.jobTypePostData.code"),
            {
              [Op.like]: `${infoUser.categoryJobCode}%`,
            }
          ),
          db.Sequelize.where(
            db.sequelize.col("postDetailData.provincePostData.code"),
            {
              [Op.like]: `${infoUser.addressCode}%`,
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
    if (listpost.length < 5) {
      const remainingSlots = 5 - listpost.length;
      let categoryPosts = await db.Post.findAll({
        limit: remainingSlots,
        where: {
          timeEnd: {
            [Op.gt]: currentDateString,
          },
          statusCode: "APPROVED",
          [Op.or]: [
            db.Sequelize.where(
              db.sequelize.col("postDetailData.jobTypePostData.code"),
              {
                [Op.like]: `${infoUser.categoryJobCode}%`,
              }
            ),
            db.Sequelize.where(
              db.sequelize.col("postDetailData.provincePostData.code"),
              {
                [Op.like]: `${infoUser.addressCode}%`,
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
      listpost = [...listpost, ...categoryPosts];
    }
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
      //console.log("listUserGetMail", listUserGetMail);
      for (let user of listUserGetMail) {
        let mailTemplate = await getTemplateMail(user);

        if (mailTemplate !== 0) {
          sendmail(mailTemplate, user.UserDetailData.email);
          let notification = await db.Notification.create({
            content: `You have received a job suggestion email. Please check your email for more details`,
            userId: user.UserDetailData.id,
          });
          if (notification) {
            let userSocketId = user.UserDetailData.id.toString();
            console.log("userSocket", userSocketId);
            global.ioGlobal.to(userSocketId).emit("ReceivedMail", {
              message: notification.content,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    console.log("đã gửi");
  });
};
const checkReportPost = () => {
  schedule.scheduleJob(rule, async function () {
    try {
      let reports = await db.Report.findAll({
        attributes: [
          "postId",
          [db.Sequelize.fn("COUNT", "postId"), "reportCount"],
        ],
        where: { isChecked: 0 },
        group: ["postId"],
        having: db.Sequelize.literal("reportCount >= 1"),
        raw: true,
      });
      if (reports && reports.length > 0) {
        for (let report of reports) {
          let post = await db.Post.findOne({
            where: { id: report.postId },
            raw: false,
          });

          post.statusCode = "BANNED";
          console.log("Đã ẩn bài đăng", post.id);
          await post.save();

          let detailPost = await db.DetailPost.findOne({
            where: { id: post.detailPostId },
            raw: false,
          });
          console.log("detailPost");
          let notification = await db.Notification.create({
            content: `Bài đăng ${detailPost.name} của bạn đã bị ẩn do vi phạm nội quy`,
            userId: post.userId,
          });
          if (notification) {
            let userSocketId = post.userId.toString();
            console.log("userSocket", userSocketId);
            global.ioGlobal.to(userSocketId).emit("autoBanPost", {
              message: notification.content,
            });
          }
          await db.Report.update(
            { isChecked: 1 },
            { where: { postId: report.postId, isChecked: 0 } }
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
    console.log("đã kiểm tra");
  });
};

module.exports = {
  sendJobMail,
  checkReportPost,
};
