import e from "express";
import db from "../models/index";
import { raw } from "body-parser";

const { Op } = require("sequelize");

// Get all post with user and detail post
let getAllPost = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let post = await db.Post.findAll({
        where: {
          statusCode: "Active",
          timeEnd: {
            [Op.gte]: new Date().getTime(),
          },
        },
        include: [
          {
            model: db.User,
            as: "userPostData",
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: db.DetailPost,
            as: "postDetailData",
          },
        ],
        order: [["timePost", "DESC"]],
        limit: query.limit,
        offset: query.offset,
      });

      if (post) {
        resolve(post);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let handleCreateNewPost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.categoryJobCode ||
        !data.addressCode ||
        !data.salaryJobCode ||
        !data.amount ||
        !data.timeEnd ||
        !data.jobLevelCode ||
        !data.userId ||
        !data.workTypeCode ||
        !data.experienceJobCode ||
        !data.genderPostCode ||
        !data.description ||
        data.isHot === ""
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        let user = await db.User.findOne({
          where: { id: data.userId },
          attributes: {
            exclude: ["password", "userId", "image"],
          },
        });
        let company = await db.Company.findOne({
          where: { userId: user.companyId },
          raw: false,
        });
        if (!company) {
          resolve({
            errCode: 2,
            errMessage: "User is not company",
          });
        } else {
          if (company.status === "Active") {
            if (data.isHot === 1) {
              if (company.allowHotPost > 0) {
                company.allowHotPost -= 1;
                await company.save({ silent: true });
              } else {
                resolve({
                  errCode: 3,
                  errMessage: "Company is not enough hot post",
                });
              }
            }
            let detailPost = await db.DetailPost.create({
              name: data.name,
              categoryJobCode: data.categoryJobCode,
              addressCode: data.addressCode,
              salaryJobCode: data.salaryJobCode,
              amount: data.amount,
              jobLevelCode: data.jobLevelCode,
              workTypeCode: data.workTypeCode,
              experienceJobCode: data.experienceJobCode,
              genderPostCode: data.genderPostCode,
              description: data.description,
            });
            if (detailPost) {
              let post = await db.Post.create({
                detailPostId: detailPost.id,
                userId: data.userId,
                isHot: data.isHot,
                timePost: new Date().getTime(),
                timeEnd: data.timeEnd,
                statusCode: "Active",
              });
              if (post) {
                resolve({
                  errCode: 0,
                  errMessage: "Create post success",
                });
              } else {
                resolve({
                  errCode: 4,
                  errMessage: "Create post fail",
                });
              }
            }
          } else {
            resolve({
              errCode: 5,
              errMessage: "Company is not active",
            });
          }
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailPostById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        let post = await db.Post.findOne({
          where: { id: id },
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
        if (post) {
          let user = await db.User.findOne({
            where: { id: post.userId },
            attributes: {
              exclude: ["password", "userId", "image"],
            },
          });
          let company = await db.Company.findOne({
            where: { id: user.companyId },
          });
          post.companyData = company;
          resolve({
            errCode: 0,
            data: post,
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Can not get detail post by id",
          });
        }
      }
    } catch (error) {
      reject(error.message);
    }
  });
};

module.exports = {
  getAllPost: getAllPost,
  handleCreateNewPost: handleCreateNewPost,
  getDetailPostById: getDetailPostById,
};
