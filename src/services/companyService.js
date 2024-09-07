import db from "../models/index";
import { Op } from "sequelize";

let getAllCompanies = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      db.Company.findAll({
        where: {
          statusCode: "ACTIVE",
        },
      }).then((companies) => {
        resolve(companies);
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllCompanies: getAllCompanies,
};
