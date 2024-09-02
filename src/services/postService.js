import e from "express";
import db from "../models/index";

const { Op } = require("sequelize");

// Get all post
let getAllPost = async () => {
  return new Promise(async (resolve, reject) => {});
};

module.exports = {
  getAllPost: getAllPost,
};
