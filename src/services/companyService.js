import e from "express";
import db from "../models/index";
import { Op, where } from "sequelize";
const cloudinary = require("../utils/cloudinary");

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
          if (data.thumbnail && data.coverimage) {
            const uploadedThumbnailResponse = await cloudinary.uploader.upload(
              data.thumbnail,
              {
                upload_preset: "ml_default",
              }
            );
            const uploadedCoverImageResponse = await cloudinary.uploader.upload(
              data.coverimage,
              {
                upload_preset: "ml_default",
              }
            );
            thumbnailUrl = uploadedThumbnailResponse.url;
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
            file: data.file ? data.file : "",
            allowPost: data.allowPost,
            allowHotPost: data.allowHotPost,
            allowCvFree: data.allowCvFree,
            allowCv: data.allowCv,
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
            attributes: ["id"],
          });
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

module.exports = {
  getAllCompanies: getAllCompanies,
  handleCreateNewCompany: handleCreateNewCompany,
  handleAddUserToCompany: handleAddUserToCompany,
  getCompanyById: getCompanyById,
};
