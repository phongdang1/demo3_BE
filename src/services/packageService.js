import { name } from "ejs";
import db from "../models/index";
const { Op } = require("sequelize");

let checkPackageNameExist = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.type) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let checkPackage = await db.Package.findOne({
          where: {
            [Op.and]: [{ name: data.name }, { type: data.type }],
          },
        });
        if (checkPackage) {
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

let handleCreateNewPackage = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.price || !data.type) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let checkPackage = await checkPackageNameExist(data);
        if (checkPackage) {
          return resolve({
            errCode: 2,
            errMessage: "Package is already exist",
          });
        }
        let inforPackage = {
          name: data.name,
          price: data.price,
          type: data.type,
          statusCode: "Active",
        };
        let newPackage = await db.Package.create(inforPackage);
        if (newPackage) {
          resolve({
            errCode: 0,
            errMessage: "Create new package success",
            data: newPackage,
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Create new package failed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleUpdatePackage = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.name || !data.price || !data.type) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let checkPackage = await checkPackageNameExist(data);
        if (checkPackage) {
          return resolve({
            errCode: 2,
            errMessage: "Package is already exist",
          });
        }
        let inforUpdate = {
          name: data.name,
          price: data.price,
          type: data.type,
        };
        let update = await db.Package.update(inforUpdate, {
          where: {
            id: data.id,
          },
        });
        if (update) {
          resolve({
            errCode: 0,
            errMessage: "Update package success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Update package failed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleActivePackage = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let inforUpdate = {
          statusCode: "Active",
        };
        let update = await db.Package.update(inforUpdate, {
          where: {
            id: data.id,
          },
        });
        if (update) {
          resolve({
            errCode: 0,
            errMessage: "Active package success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Active package failed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleDeactivePackage = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let inforUpdate = {
          statusCode: "inactive",
        };
        let update = await db.Package.update(inforUpdate, {
          where: {
            id: data.id,
          },
        });
        if (update) {
          resolve({
            errCode: 0,
            errMessage: "Deactive package success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Deactive package failed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllPackage = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectQuery = {};
      if (data.searchKey) {
        objectQuery.where = { name: { [Op.like]: `%${data.searchKey}%` } };
      }

      let dataPackage = await db.Package.findAndCountAll(objectQuery);
      resolve({
        errCode: 0,
        data: dataPackage.rows,
        count: dataPackage.count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleCreateNewPackage: handleCreateNewPackage,
  handleUpdatePackage: handleUpdatePackage,
  handleActivePackage: handleActivePackage,
  handleDeactivePackage: handleDeactivePackage,
  getAllPackage: getAllPackage,
};
