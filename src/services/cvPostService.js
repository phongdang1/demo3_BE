import e from "express";
import db from "../models/index";
import CommonUtils from "../utils/CommonUtils";
import { raw } from "body-parser";
const { Op, and, where } = require("sequelize");

let caculateMatchCv = async (file, mapRequired) => {
  try {
    let match = 0;
    // thuật toán OCR
    let words = await CommonUtils.pdfToString(file);

    for (let key of mapRequired.keys()) {
      let requiredKeyword = mapRequired.get(key).toLowerCase().trim();
      if (words.includes(requiredKeyword)) {
        match++;
      }
    }
    let totalRequiredKeywords = mapRequired.size; // Tổng số từ yêu cầu
    let matchRatio = (match / totalRequiredKeywords) * 100; // Tỷ lệ phần trăm

    return matchRatio;
  } catch (err) {
    console.error("Error calculating CV match:", err);
    return 0;
  }
};
let caculateMatchUserWithFilter = async (userData, listSkillRequired) => {
  let match = 0;
  let myListSkillRequired = new Map();
  listSkillRequired.forEach((item) => {
    myListSkillRequired.set(item.id, item.name);
  });

  let userskill = await db.UserSkill.findAll({
    where: { userId: userData.userId },
  });
  for (let key of myListSkillRequired.keys()) {
    let temp = [...userskill];
    temp.forEach((item, index) => {
      if (item.skillId === key) {
        userskill.splice(index, 1);
        match++;
      }
    });
  }

  return match;
};
let getMapRequiredSkill = async (userId, requirement) => {
  try {
    let match = 0;
    let listSkillRequired = await db.UserSkill.findAll({
      where: { userId: userId },
      include: [
        {
          model: db.Skill,
          as: "skillData",
          attributes: ["id", "name"],
        },
      ],
      raw: true,
      nest: true,
    });
    console.log("listSkillRequired", listSkillRequired);
    let mapListSkill = new Map();
    listSkillRequired.forEach((item) => {
      mapListSkill.set(
        item.skillData.name.toLowerCase(),
        item.skillData.name.toLowerCase()
      );
    });
    requirement.forEach((item) => {
      if (mapListSkill.has(item.toLowerCase())) {
        match++;
      }
    });
    let totalRequiredSkills = requirement.length;
    let matchRatio = (match / totalRequiredSkills) * 100;
    return matchRatio;
  } catch (err) {
    console.error("Error calculating skill match:", err);
    return 0;
  }
};

let handleApplyJob = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.userId || !data.postId || !data.description) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let checkApply = await db.CvPost.findOne({
          where: {
            userId: data.userId,
            postId: data.postId,
          },
        });
        if (checkApply) {
          return resolve({
            errCode: 3,
            errMessage: "You have already applied for this job",
          });
        }
        let user = await db.UserDetail.findOne({
          where: { userId: data.userId },
          attributes: ["file"],
        });

        let cvApply = await db.CvPost.create({
          userId: data.userId,
          postId: data.postId,
          file: user.file,
          description: data.description,
          isChecked: 0,
          statusCode: "PENDING",
        });
        if (cvApply) {
          resolve({
            errCode: 0,
            errMessage: "Apply job success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Apply job failed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllListCvByPost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.postId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let listCv = await db.CvPost.findAndCountAll({
          where: { postId: data.postId },
          nest: true,
          raw: true,
          include: [
            {
              model: db.User,
              as: "userCvData",
              attributes: {
                exclude: ["password", "userId", "image", "companyId", "file"],
              },
            },
          ],
        });
        let postInfo = await db.Post.findOne({
          where: { id: data.postId },
          raw: true,
          nest: true,
          include: [
            {
              model: db.DetailPost,
              as: "postDetailData",
              attributes: [
                "id",
                "name",
                "description",
                "amount",
                "requirement",
                "benefit",
              ],
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
            {
              model: db.User,
              as: "userPostData",
              attributes: {
                exclude: ["password", "userId", "image"],
              },
              include: [
                {
                  model: db.Company,
                  as: "userCompanyData",
                },
              ],
            },
          ],
        });
        let requirement = CommonUtils.flatAllString(
          postInfo.postDetailData.requirement
        );
        let mapRequired = new Map();
        requirement.forEach((item) => {
          mapRequired.set(item, item);
        });

        for (let i = 0; i < listCv.rows.length; i++) {
          let cv = listCv.rows[i];
          let match = await caculateMatchCv(cv.file, mapRequired);
          let matchSkill = await getMapRequiredSkill(cv.userId, requirement);
          if (match > matchSkill) {
            cv.file = match + "%";
          } else {
            cv.file = matchSkill + "%";
          }
        }
        resolve({
          errCode: 0,
          message: "Get list cv success",
          data: listCv.rows,
          count: listCv.count,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getDetailCvPostById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.cvPostId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let cvDetail = await db.CvPost.findOne({
          where: { id: data.cvPostId },
          include: [
            {
              model: db.User,
              as: "userCvData",
              attributes: {
                exclude: ["password", "userId", "image", "companyId", "file"],
              },
            },
          ],
          raw: false,
          nest: true,
        });
        let user = await db.User.findOne({
          where: { id: data.userId },
        });
        if (user.roleCode !== "USER") {
          cvDetail.isChecked = 1;
          await cvDetail.save();
        }
        resolve({
          errCode: 0,
          data: cvDetail,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllCvPostByUserId = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.userId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let listCv = await db.CvPost.findAndCountAll({
          where: { userId: data.userId },
          include: [
            {
              model: db.Post,
              as: "postCvData",
              include: [
                {
                  model: db.DetailPost,
                  as: "postDetailData",
                  attributes: [
                    "id",
                    "name",
                    "description",
                    "amount",
                    "requirement",
                    "benefit",
                  ],
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
            },
          ],
          raw: true,
          nest: true,
        });
        resolve({
          errCode: 0,
          data: listCv.rows,
          count: listCv.count,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleFindCv = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectQuery = {
        where: {
          isFindJob: 1,
          file: {
            [Op.ne]: null,
          },
        },
        attributes: {
          exclude: ["password", "image"],
        },
        include: [
          {
            model: db.User,
            as: "UserDetailData",
            attributes: {
              exclude: ["password", "image"],
            },
          },
        ],
        raw: true,
        nest: true,
      };
      if (data.categoryJobCode) {
        objectQuery.where = {
          ...objectQuery.where,
          categoryJobCode: data.categoryJobCode,
        };
      }
      let isHiddenPercent = false;
      let listUser = await db.UserDetail.findAndCountAll(objectQuery);
      let listSkillRequired = [];
      let numberCriteria = 0;
      if (data.experienceJobCode) {
        numberCriteria++;
      }
      if (data.salaryJobCode) {
        numberCriteria++;
      }
      if (data.addressCode) {
        numberCriteria++;
      }
      if (data.genderCode) {
        numberCriteria++;
      }
      if (data.jobLevelCode) {
        numberCriteria++;
      }
      if (data.workTypeCode) {
        numberCriteria++;
      }
      if (numberCriteria > 0) {
        listUser.rows.forEach((item) => {
          item.numberCriteriaOfUser = 0;
          if (item.salaryJobCode === data.salaryJobCode) {
            item.numberCriteriaOfUser++;
          }
          if (item.experienceJobCode === data.experienceJobCode) {
            item.numberCriteriaOfUser++;
          }
          if (item.addressCode === data.addressCode) {
            item.numberCriteriaOfUser++;
          }
          if (item.genderCode === data.genderCode) {
            item.numberCriteriaOfUser++;
          }
          if (item.jobLevelCode === data.jobLevelCode) {
            item.numberCriteriaOfUser++;
          }
          if (item.workTypeCode === data.workTypeCode) {
            item.numberCriteriaOfUser++;
          }
        });
      }
      let lengthSkill = 0;
      if (data.listSkills) {
        lengthSkill = data.listSkills.length;
        listSkillRequired = await db.Skill.findAll({
          where: {
            id: data.listSkills,
          },
          attributes: ["id", "name"],
        });
      }
      console.log("listUser", listUser);
      if (listSkillRequired.length > 0 || numberCriteria > 0) {
        for (let item of listUser.rows) {
          let match = await caculateMatchUserWithFilter(
            item,
            listSkillRequired
          );
          console.log("match", match);

          if (numberCriteria > 0) {
            item.file =
              Math.round(
                ((match + item.numberCriteriaOfUser) /
                  (lengthSkill + numberCriteria) +
                  Number.EPSILON) *
                  100
              ) + "%";
            console.log("item.file", item.file);
          } else {
            item.file =
              Math.round((match / lengthSkill + Number.EPSILON) * 100) + "%";
          }
        }
      } else {
        isHiddenPercent = true;
        listUser.rows.forEach((item) => {
          item.file = "0%";
        });
      }

      resolve({
        errCode: 0,
        message: "Filter user success",
        data: listUser.rows,
        count: listUser.count,
        isHiddenPercent: isHiddenPercent,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let checkViewCompany = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.userId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let company = await db.Company.findOne({
          where: { userId: data.userId },
          attributes: ["id", "allowCv"],
          raw: false,
        });
        if (!company) {
          resolve({
            errCode: 2,
            errMessage: "Company not found",
          });
        } else {
          if (company.allowCv > 0) {
            company.allowCv -= 1;
            await company.save();
            resolve({
              errCode: 0,
              message: "OK",
            });
          } else {
            resolve({
              errCode: 3,
              errMessage: "Xin lỗi, Công ty của bạn đã hết lượt xem CV",
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let testCommon = () => {
  return new Promise(async (resolve, reject) => {
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
      console.log("listpost", listpost);
      return resolve("oke");
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleApplyJob: handleApplyJob,
  getAllListCvByPost: getAllListCvByPost,
  getDetailCvPostById: getDetailCvPostById,
  handleFindCv: handleFindCv,
  checkViewCompany: checkViewCompany,
  testCommon: testCommon,
  getAllCvPostByUserId: getAllCvPostByUserId,
};
