import { raw } from "body-parser";
import db from "../models/index";
const { Op } = require("sequelize");

let handleCreateNewSkill = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.categoryJobCode) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let checkExit = await db.Skill.findOne({
          where: { name: data.name, categoryJobCode: data.categoryJobCode },
        });
        if (checkExit) {
          resolve({
            errCode: 2,
            errMessage: "Skill is exist",
          });
        } else {
          await db.Skill.create({
            name: data.name,
            categoryJobCode: data.categoryJobCode,
          });
          resolve({
            errCode: 0,
            errMessage: "Create skill success",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleDeleteSkill = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.skillId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let skill = await db.Skill.findOne({
          where: { id: data.skillId },
        });
        if (!skill) {
          resolve({
            errCode: 2,
            errMessage: "Skill is not exist",
          });
        } else {
          let isSkillUser = await db.UserSkill.findOne({
            where: { skillId: data.skillId },
          });
          if (isSkillUser) {
            resolve({
              errCode: 3,
              errMessage:
                "Cannot delete this skill. This skill is being used by user",
            });
          } else {
            await db.Skill.destroy({
              where: { id: data.skillId },
            });
            resolve({
              errCode: 0,
              errMessage: "Delete skill success",
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllSkillByCategory = (categoryJobCode) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!categoryJobCode) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let skills = await db.Skill.findAll({
          where: { categoryJobCode: categoryJobCode },
        });
        resolve({
          errCode: 0,
          data: skills,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getSkillById = (skillId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!skillId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let skill = await db.Skill.findOne({
          where: { id: skillId },
        });
        if (!skill) {
          resolve({
            errCode: 2,
            errMessage: "Skill is not exist",
          });
        } else {
          resolve({
            errCode: 0,
            data: skill,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleUpdateSkill = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.name || !data.categoryJobCode) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let skill = await db.Skill.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (!skill) {
          resolve({
            errCode: 2,
            errMessage: "Skill is not exist",
          });
        } else {
          skill.name = data.name;
          skill.categoryJobCode = data.categoryJobCode;
          await skill.save();
          resolve({
            errCode: 0,
            errMessage: "Update skill success",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllSkillWithLimit = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.limit || !data.offset) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let objectQuery = {
          limit: +data.limit,
          offset: +data.offset,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          raw: true,
          nest: true,
        };
        console.log(objectQuery);
        if (data.searchKey) {
          objectQuery.where = {
            ...objectQuery.where,
            name: { [Op.like]: `%${data.searchKey}%` },
          };
        }
        let skills = await db.Skill.findAndCountAll(objectQuery);
        resolve({
          errCode: 0,
          data: skills.rows,
          count: skills.count,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllSkill = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectQuery = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        raw: true,
        nest: true,
      };
      console.log(objectQuery);
      if (data.searchKey) {
        objectQuery.where = {
          ...objectQuery.where,
          name: { [Op.like]: `%${data.searchKey}%` },
        };
      }
      let skills = await db.Skill.findAndCountAll(objectQuery);
      resolve({
        errCode: 0,
        data: skills.rows,
        count: skills.count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleCreateNewSkill: handleCreateNewSkill,
  handleDeleteSkill: handleDeleteSkill,
  getAllSkillByCategory: getAllSkillByCategory,
  getSkillById: getSkillById,
  handleUpdateSkill: handleUpdateSkill,
  getAllSkillWithLimit: getAllSkillWithLimit,
  getAllSkill: getAllSkill,
};
