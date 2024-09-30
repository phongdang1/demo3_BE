import { raw } from "body-parser";
import db from "../models/index";
const { Op } = require("sequelize");

let handleCreateNewAllCode = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.type || !data.code || !data.value) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let checkExit = await db.Allcode.findOne({
          where: { code: data.code },
        });
        if (checkExit) {
          resolve({
            errCode: 2,
            errMessage: "Allcode is exist",
          });
        } else {
          await db.Allcode.create({
            type: data.type,
            code: data.code,
            value: data.value,
          });
          resolve({
            errCode: 0,
            errMessage: "Create allcode success",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllCodeByType = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        resolve({
          errCode: 0,
          data: allcode,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllCode = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allcode = await db.Allcode.findAll();
      resolve({
        errCode: 0,
        data: allcode,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let handleUpdateAllCode = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.type || !data.code || !data.value) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let allCodeRes = await db.Allcode.findOne({
          where: { code: data.code },
          raw: false,
        });
        if (allCodeRes) {
          allCodeRes.value = data.value;
          allCodeRes.code = data.code;
          allCodeRes = await allCodeRes.save();
          if (allCodeRes) {
            resolve({
              errCode: 0,
              errMessage: "Update allcode success",
            });
          } else {
            resolve({
              errCode: 2,
              errMessage: "Update allcode failed",
            });
          }
        } else {
          resolve({
            errCode: 3,
            errMessage: "Allcode not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleCreateNewAllCode: handleCreateNewAllCode,
  getAllCodeByType: getAllCodeByType,
  getAllCode: getAllCode,
  handleUpdateAllCode: handleUpdateAllCode,
};
