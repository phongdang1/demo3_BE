import e from "express";
import db from "../models/index";

const { Op } = require("sequelize");

// Get all post with user and detail post
let getAllPost = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let post = await db.Post.findAll({
        where: {
          statusCode: "Active",
          timeEnd: {
            [Op.gte]: new Date().getTime(),
          },
        },
        include: [
          {
            model: db.User,
            as: "userPostData",
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: db.DetailPost,
            as: "postDetailData",
          },
        ],
        order: [["timePost", "DESC"]],
        limit: query.limit,
        offset: query.offset,
      });

      if (post) {
        resolve(post);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllPost: getAllPost,
};
