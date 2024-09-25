import e from "express";
import db from "../models/index";
import CommonUtils from "../utils/CommonUtils";
import { raw } from "body-parser";
const { Op, and } = require("sequelize");

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
      if (item.SkillId === key) {
        userskill.splice(index, 1);
        match++;
      }
    });
  }
  let matchFromCV = await caculateMatchCv(userData.file, myListSkillRequired);
  return match + matchFromCV;
};

let handleApplyJob = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.userId || !data.postId || !data.file || !data.description) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let cvApply = await db.CvPost.create({
          userId: data.userId,
          postId: data.postId,
          file: data.file,
          description: data.description,
          isChecked: 0,
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

let getAllListCvByPost = (postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!postId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let listCv = await db.CvPost.findAll({
          where: { postId: postId },
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
        resolve({
          errCode: 0,
          data: listCv,
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
        if (user.roleCode !== "CANDIDATE") {
          cvDetail.isChecked = 1;
          await cvDetail.save();
        }
        if (cvDetail.file) {
          cvDetail.file = Buffer.from(cvDetail.file, "base64").toString(
            "binary"
          );
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

module.exports = {
  handleApplyJob: handleApplyJob,
  getAllListCvByPost: getAllListCvByPost,
  getDetailCvPostById: getDetailCvPostById,
};
