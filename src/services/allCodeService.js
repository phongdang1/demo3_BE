import { raw } from "body-parser";
import db from "../models/index";
const { Op } = require("sequelize");
const cloudinary = require("../utils/cloudinary");

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
          let imageCategoryUrl = "";
          if (data.image) {
            const uploadImageResponse = await cloudinary.uploader.upload(
              data.image,
              {
                upload_preset: "ml_default",
              }
            );
            imageCategoryUrl = uploadImageResponse.url;
          }

          await db.Allcode.create({
            type: data.type,
            code: data.code,
            value: data.value,
            image: imageCategoryUrl,
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
let getValueByCode = (code) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!code) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let allcode = await db.Allcode.findOne({
          where: { code: code },
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
          let imageCategoryUrl = "";
          if (data.image) {
            const uploadImageResponse = await cloudinary.uploader.upload(
              data.image,
              {
                upload_preset: "ml_default",
              }
            );
            imageCategoryUrl = uploadImageResponse.url;
          }
          allCodeRes.value = data.value;
          allCodeRes.code = data.code;
          allCodeRes.type = data.type;
          allCodeRes.image = imageCategoryUrl;

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

let handleDeleteAllCode = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.code) {
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
          allCodeRes = await allCodeRes.destroy();
          if (allCodeRes) {
            resolve({
              errCode: 0,
              errMessage: "Delete allcode success",
            });
          } else {
            resolve({
              errCode: 2,
              errMessage: "Delete allcode failed",
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
      if (error.message.includes("foreign key constraint fails")) {
        resolve({
          errCode: 3,
          errMessage:
            "You can't delete this code because it is being used in other tables",
        });
      }
      reject(error.message);
    }
  });
};

module.exports = {
  handleCreateNewAllCode: handleCreateNewAllCode,
  getAllCodeByType: getAllCodeByType,
  getAllCode: getAllCode,
  handleUpdateAllCode: handleUpdateAllCode,
  getValueByCode: getValueByCode,
  handleDeleteAllCode: handleDeleteAllCode,
};
