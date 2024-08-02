import e from "express";
import db from "../models/index";
const { Op } = require("sequelize");

let getAllUsers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findAll();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllUsers: getAllUsers,
};
