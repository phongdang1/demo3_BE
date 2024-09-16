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
        let checkExit = await db.Skills.findOne({
          where: { name: data.name, categoryJobCode: data.categoryJobCode },
        });
        if (checkExit) {
          resolve({
            errCode: 2,
            errMessage: "Skill is exist",
          });
        } else {
          await db.Skills.create({
            skillName: data.skillName,
            skillDescription: data.skillDescription,
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

let handleDetelteSkill = (skillId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!skillId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let skill = await db.Skills.findOne({
          where: { id: skillId },
        });
        if (!skill) {
          resolve({
            errCode: 2,
            errMessage: "Skill is not exist",
          });
        } else {
          let isSkillUser = await db.UserSkills.findOne({
            where: { skillId: skillId },
          });
          if (isSkillUser) {
            resolve({
              errCode: 3,
              errMessage:
                "Cannot delete this skill. This skill is being used by user",
            });
          } else {
            await db.Skills.destroy({
              where: { id: skillId },
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
        let skills = await db.Skills.findAll({
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
        let skill = await db.Skills.findOne({
          where: { id: skillId },
          include: {
            model: db.AllCode,
            as: "jobTypeSkillData",
            attributes: ["value", "code"],
          },
          raw: true,
          nest: true,
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
        let skill = await db.Skills.findOne({
          where: { id: data.id },
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

module.exports = {
  handleCreateNewSkill: handleCreateNewSkill,
  handleDetelteSkill: handleDetelteSkill,
  getAllSkillByCategory: getAllSkillByCategory,
  getSkillById: getSkillById,
  handleUpdateSkill: handleUpdateSkill,
};
