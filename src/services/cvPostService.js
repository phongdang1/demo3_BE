import e from "express";
import db from "../models/index";
import CommonUtils from "../utils/CommonUtils";
import { raw } from "body-parser";
const { Op, and, where } = require("sequelize");

let caculateMatchCv = async (file, mapRequired) => {
  try {
    let match = 0;

    // Lấy danh sách từ từ tệp PDF
    let words = await CommonUtils.pdfToString(file);
    for (let key of mapRequired.keys()) {
      let requiredKeyword = mapRequired.get(key);
      if (words.includes(requiredKeyword)) {
        match++;
      }
    }
    return match;
  } catch (err) {
    console.error("Error calculating CV match:", err);
    return 0;
  }
};

let caculateMatchUserWithFilter = async (userData, listSkillRequired) => {
  let match = 0;
  let myListSkillRequired = new Map();

  // Thêm kỹ năng yêu cầu vào bản đồ
  listSkillRequired.forEach((item) => {
    myListSkillRequired.set(item.id, item.name);
  });
  let userskill = await db.UserSkill.findAll({
    where: { userId: userData.userId },
  });
  let matchedSkills = new Set();
  userskill.forEach((item) => {
    if (myListSkillRequired.has(item.SkillId)) {
      matchedSkills.add(item.SkillId);
      match++;
    }
  });

  // Tính toán số lượng khớp từ CV
  let matchFromCV = await caculateMatchCv(userData.file, myListSkillRequired);

  return match + matchFromCV;
};
let getMapRequiredSkill = (mapListSkill, post) => {
  // Chuyển đổi mô tả sang chữ thường để dễ dàng so sánh
  const description = CommonUtils.flatAllString(
    post.postDetailData.requirement
  );
  //nếu mô tả không trùng với kỹ năng yêu cầu thì thêm vào map từng từ
  description.forEach((item) => {
    if (!mapListSkill.has(item)) {
      mapListSkill.set(item, item);
    }
  });
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
        let listSkillRequired = await db.UserSkill.findAll({
          where: { userId: postInfo.userPostData.id },
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
        let mapListSkill = new Map();
        listSkillRequired.forEach((item) => {
          mapListSkill.set(
            item.skillData.name.toLowerCase(),
            item.skillData.name.toLowerCase()
          );
        });
        let mapRequired = new Map();
        let requirement = CommonUtils.flatAllString(
          postInfo.postDetailData.requirement
        );
        requirement.forEach((item) => {
          mapRequired.set(item, item);
        });
        console.log(mapRequired);
        getMapRequiredSkill(mapListSkill, postInfo);
        for (let i = 0; i < listCv.rows.length; i++) {
          let match = await caculateMatchCv(listCv.rows[i].file, mapListSkill);
          console.log(listCv.rows[i].file);
          listCv.rows[i].file =
            Math.round((match / mapRequired.size + Number.EPSILON) * 100) + "%";
          if (listCv.rows[i].file > "75%") {
            listCv.rows[i].file = "75%";
          } else if (listCv.rows[i].file < "25%") {
            listCv.rows[i].file = "35%";
          } else if (
            listCv.rows[i].file > "25%" &&
            listCv.rows[i].file < "75%"
          ) {
            listCv.rows[i].file = "55%";
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
      };
    } catch (error) {
      reject(error);
    }
  });
};

let testCommon = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.UserDetail.findOne({
        where: { id: 2 },
      });
      if (user) {
        console.log("user", user);
        let cvData = await CommonUtils.pdfToString(user.file);
        resolve(cvData);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleApplyJob: handleApplyJob,
  getAllListCvByPost: getAllListCvByPost,
  getDetailCvPostById: getDetailCvPostById,
  testCommon: testCommon,
  getAllCvPostByUserId: getAllCvPostByUserId,
};
