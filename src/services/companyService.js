import e from "express";
import db from "../models/index";
import { Op, where } from "sequelize";
const cloudinary = require("../utils/cloudinary");
var nodemailer = require("nodemailer");
let sendmail = (note, userMail, link = null) => {
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
    subject: "Thông báo từ trang Job Finder",
    html: note,
  };
  if (link) {
    mailOptions.html =
      note +
      ` <br>
      xem thông tin công ty <a href='${process.env.URL_REACT}/${link}'>Tại đây</a> `;
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
    } else {
    }
  });
};

let checkCompany = (name, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!name) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        let company = "";
        if (id) {
          company = await db.Company.findOne({
            where: { name: name, id: { [Op.ne]: id } },
          });
        } else {
          company = await db.Company.findOne({
            where: { name: name },
          });
        }
        if (company) {
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
let getAllCompanies = (data) => {
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
          where: {
            statusCode: "ACTIVE",
          },
        };
        if (data.searchKey) {
          objectQuery.where = {
            [Op.or]: [
              { name: { [Op.like]: `%${data.searchKey}%` } },
              { address: { [Op.like]: `%${data.searchKey}%` } },
            ],
          };
        }
        let result = await db.Company.findAndCountAll(objectQuery);
        resolve({
          errCode: 0,
          errMessage: "Get all companies succeed",
          data: result.rows ? result.rows : [],
          count: result.count ? result.count : 0,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleCreateNewCompany = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.description ||
        !data.phonenumber ||
        !data.amountEmployer ||
        !data.userId
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        if (await checkCompany(data.name)) {
          resolve({
            errCode: 2,
            errMessage: "Company is exist",
          });
        } else {
          let thumbnailUrl = "";
          let coverImageUrl = "";

          console.log(createAt1);
          if (data.thumbnail) {
            const uploadedThumbnailResponse = await cloudinary.uploader.upload(
              data.thumbnail,
              {
                upload_preset: "ml_default",
              }
            );
            thumbnailUrl = uploadedThumbnailResponse.url;
          }
          if (data.coverimage) {
            const uploadedCoverImageResponse = await cloudinary.uploader.upload(
              data.coverimage,
              {
                upload_preset: "ml_default",
              }
            );
            coverImageUrl = uploadedCoverImageResponse.url;
          }
          let company = await db.Company.create({
            userId: data.userId,
            name: data.name,
            thumbnail: thumbnailUrl,
            coverimage: coverImageUrl,
            description: data.description,
            website: data.website,
            address: data.address,
            phonenumber: data.phonenumber,
            amountEmployer: data.amountEmployer,
            taxnumber: data.taxnumber,
            censorCode: data.censorCode,
            statusCode: "ACTIVE",
            file: data.file ? data.file : null,
            allowPost: data.allowPost,
            allowHotPost: data.allowHotPost,
            allowCvFree: data.allowCvFree,
            allowCv: data.allowCv,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          let user = await db.User.findOne({
            where: { id: data.userId },
            raw: false,
            attributes: {
              exclude: ["password", "image", "userId"],
            },
          });
          if (user) {
            user.companyId = company.id;
            user.roleCode = "COMPANY";
            await user.save({ silent: true });
            resolve({
              errCode: 0,
              errMessage: "Create company succeed",
              data: company,
            });
          } else {
            resolve({
              errCode: 3,
              errMessage: "Cannot find user",
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleAddUserToCompany = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.phoneNumber || !data.companyId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        let company = await db.Company.findOne({
          where: { id: data.companyId },
        });
        if (company) {
          let isExist = await db.User.findOne({
            where: { phoneNumber: data.phoneNumber },
          });
          if (isExist) {
            if (isExist.roleCode !== "EMPLOYER") {
              resolve({
                errCode: 2,
                errMessage: "User is not employer",
              });
            } else {
              if (isExist.companyId) {
                resolve({
                  errCode: 3,
                  errMessage: "User is already in a company",
                });
              } else {
                isExist.companyId = data.companyId;
                isExist.roleCode = "EMPLOYER";
                await isExist.save({ silent: true });
                resolve({
                  errCode: 0,
                  errMessage: "Add user to company succeed",
                });
              }
            }
          } else {
            resolve({
              errCode: 4,
              errMessage: "Cannot find user",
            });
          }
        } else {
          resolve({
            errCode: 4,
            errMessage: "Cannot find company",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getCompanyById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        let company = await db.Company.findOne({
          where: { id: id },
        });
        if (!company) {
          resolve({
            errCode: 2,
            errMessage: "Cannot find company",
          });
        } else {
          let listUserOfCompany = await db.User.findAll({
            where: { companyId: company.id },
            attributes: ["id", "phoneNumber"],
          });
          company.userData = listUserOfCompany;
          listUserOfCompany = listUserOfCompany.map((item) => {
            return {
              userId: item.id,
            };
          });

          company.postData = await db.Post.findAll({
            where: {
              [Op.and]: [
                { statusCode: "ACTIVE" },
                { [Op.or]: listUserOfCompany },
              ],
            },
            order: [["timePost", "DESC"]],
            limit: 5,
            offset: 0,
            attributes: {
              exclude: ["detailPostId"],
            },
            nest: true,
            raw: true,
            include: [
              {
                model: db.DetailPost,
                as: "postDetailData",
                attributes: ["id", "name", "description", "amount"],
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
                    as: "expTypePostData",
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
                ],
              },
            ],
          });
          if (company.file) {
            company.file = Buffer.from(company.file).toString("base64");
          }
          resolve({
            errCode: 0,
            errMessage: "Get company succeed",
            data: company,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleUpdateCompany = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.name ||
        !data.address ||
        !data.description ||
        !data.phonenumber ||
        !data.amountEmployer ||
        !data.userId
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        let company = await db.Company.findOne({
          where: { id: data.id },
        });
        if (!company) {
          resolve({
            errCode: 2,
            errMessage: "Cannot find company",
          });
        } else {
          if (await checkCompany(data.name, data.id)) {
            resolve({
              errCode: 3,
              errMessage: "Company is exist",
            });
          } else {
            if (company.statusCode === "ACTIVE") {
              let thumbnailUrl = "";
              let coverImageUrl = "";
              if (data.thumbnail) {
                const uploadedThumbnailResponse =
                  await cloudinary.uploader.upload(data.thumbnail, {
                    upload_preset: "ml_default",
                  });
                thumbnailUrl = uploadedThumbnailResponse.url;
              }
              if (data.coverimage) {
                const uploadedCoverImageResponse =
                  await cloudinary.uploader.upload(data.coverimage, {
                    upload_preset: "ml_default",
                  });
                coverImageUrl = uploadedCoverImageResponse.url;
              }
              company.name = data.name;
              company.thumbnail = thumbnailUrl;
              company.coverimage = coverImageUrl;
              company.description = data.description;
              company.website = data.website;
              company.address = data.address;
              company.phonenumber = data.phonenumber;
              company.amountEmployer = data.amountEmployer;
              company.taxnumber = data.taxnumber;
              company.censorCode = data.censorCode;
              company.file = data.file ? data.file : null;
              company.allowPost = data.allowPost;
              company.allowHotPost = data.allowHotPost;
              company.allowCvFree = data.allowCvFree;
              company.allowCv = data.allowCv;
              company.updatedAt = new Date();
              await company.save({ silent: true });
              resolve({
                errCode: 0,
                errMessage: "Update company succeed",
                data: company,
              });
            } else {
              resolve({
                errCode: 4,
                errMessage: "Company is not active. Cannot update",
              });
            }
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleBanCompany = (companyId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!companyId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        let foundCompany = await db.Company.findOne({
          where: { id: companyId },
        });
        if (!foundCompany) {
          resolve({
            errCode: 2,
            errMessage: "Cannot find company",
          });
        } else {
          foundCompany.statusCode = "BANNED";
          await foundCompany.save({ silent: true });
          let user = await db.User.findOne({
            where: { id: foundCompany.userId },
            raw: false,
            attributes: {
              exclude: ["password", "image", "userId"],
            },
          });
          sendmail(
            "Công ty của bạn đã bị khóa. Vui lòng liên hệ với quản trị viên để biết thêm chi tiết",
            user.email,
            `company/${foundCompany.id}`
          );
          resolve({
            errCode: 0,
            errMessage: "Ban company succeed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleUnBanCompany = (companyId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!companyId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        let foundCompany = await db.Company.findOne({
          where: { id: companyId },
        });
        if (!foundCompany) {
          resolve({
            errCode: 2,
            errMessage: "Cannot find company",
          });
        } else {
          foundCompany.statusCode = "ACTIVE";
          await foundCompany.save({ silent: true });
          let user = await db.User.findOne({
            where: { id: foundCompany.userId },
            raw: false,
            attributes: {
              exclude: ["password", "image", "userId"],
            },
          });
          sendmail(
            "Công ty của bạn đã được mở khóa. Bạn có thể sử dụng dịch vụ bình thường",
            user.email,
            `company/${foundCompany.id}`
          );

          resolve({
            errCode: 0,
            errMessage: "Unban company succeed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getCompanyByUserId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        let company = await db.Company.findOne({
          where: { userId: userId },
        });
        if (!company) {
          resolve({
            errCode: 2,
            errMessage: "Cannot find company",
          });
        } else {
          if (company.file) {
            company.file = Buffer.from(company.file, "base64").toString(
              "binary"
            );
          }
          resolve({
            errCode: 0,
            errMessage: "Get company succeed",
            data: company,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllUserOfCompany = (companyId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!companyId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        let company = await db.Company.findOne({
          where: { id: companyId },
        });
        if (!company) {
          resolve({
            errCode: 2,
            errMessage: "Cannot find company",
          });
        } else {
          let listUserOfCompany = await db.User.findAndCountAll({
            where: { companyId: company.id },
            attributes: ["id", "phoneNumber", "lastName", "firstName"],
          });
          resolve({
            errCode: 0,
            errMessage: "Get all user of company succeed",
            data: listUserOfCompany.rows,
            count: listUserOfCompany.count,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleApproveCompany = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.companyId || !data.userId || !data.statusCode) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      }
      let company = await db.Company.findOne({
        where: { id: data.companyId },
      });
      if (!company) {
        resolve({
          errCode: 2,
          errMessage: "Cannot find company",
        });
      }
      if (data.statusCode === "ACTIVE") {
        company.statusCode = "ACTIVE";
        await company.save({ silent: true });
        let user = await db.User.findOne({
          where: { id: company.userId },
          raw: false,
          attributes: {
            exclude: ["password", "image", "userId"],
          },
        });
        sendmail(
          "Công ty của bạn đã được duyệt. Mời bạn sử dụng dịch vụ",
          user.email,
          `company/${company.id}`
        );
        resolve({
          errCode: 0,
          errMessage: "Approve company succeed",
        });
      } else {
        company.statusCode = "INACTIVE";
        await company.save({ silent: true });
        let user = await db.User.findOne({
          where: { id: company.userId },
          raw: false,
          attributes: {
            exclude: ["password", "image", "userId"],
          },
        });
        sendmail(
          "Công ty của bạn hiện tại không đủ điều kiện sử dụng dịch vụ. Vui lòng liên hệ với quản trị viên để biết thêm chi tiết",
          user.email,
          `company/${company.id}`
        );
        resolve({
          errCode: 0,
          errMessage: "Reject company succeed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllCompanies: getAllCompanies,
  handleCreateNewCompany: handleCreateNewCompany,
  handleAddUserToCompany: handleAddUserToCompany,
  getCompanyById: getCompanyById,
  handleUpdateCompany: handleUpdateCompany,
  handleBanCompany: handleBanCompany,
  handleUnBanCompany: handleUnBanCompany,
  getCompanyByUserId: getCompanyByUserId,
  getAllUserOfCompany: getAllUserOfCompany,
  handleApproveCompany: handleApproveCompany,
};
