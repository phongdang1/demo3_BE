import db from "../models/index";
import { Op, where } from "sequelize";

let getAllCompanies = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.limit || !data.offset) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        let objectQuery = {
          limit: +data.limit,
          offset: +data.offset,
          where: {
            statusCode: "ACTIVE",
          },
        };
        if (data.searchKey) {
          objectQuery.where = {
            [Op.or]: [
              { name: { [Op.like]: `%${data.searchKey}%` } },
              { address: { [Op.like]: `%${data.searchKey}%` } },
            ],
          };
        }
        let result = await db.Company.findAndCountAll(objectQuery);
        resolve({
          errCode: 0,
          errMessage: "Get all companies succeed",
          data: result.rows ? result.rows : [],
          count: result.count ? result.count : 0,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllCompanies: getAllCompanies,
};
