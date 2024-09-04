import e from "express";
import db from "../models/index";
const { Op } = require("sequelize");

let getAllCompanies = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Company.findAll();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const getCompanyById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const company = await db.Company.findByPk(id);
      resolve(company);
    } catch (error) {
      reject(error);
    }
  });
};


module.exports = {
  getAllCompanies: getAllCompanies,
  getCompanyById,
};
