import db from "../models/index";
import { Op } from "sequelize";

let getAllCompanies = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data.limit === undefined || data.offset === undefined || !data) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        let objectQuery = {
          offset: +data.offset,
          limit: +data.limit,
          where: {
            statusCode: "ACTIVE",
          },
        };
        if (data.searchKey) {
          objectQuery.where = {
            ...objectQuery.where,
            name: { [Op.like]: `%${data.searchKey}%` },
          };
        }
        let company = await db.Company.findAndCountAll(objectQuery);
        if (company.count === 0) {
          resolve({
            errCode: 0,
            errMessage: "No companies found",
            data: [],
            count: 0,
          });
        } else {
          resolve({
            errCode: 0,
            data: company.rows,
            count: company.count,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllCompanies: getAllCompanies,
};
