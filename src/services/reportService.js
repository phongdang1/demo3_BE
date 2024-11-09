import e from "express";
import db from "../models/index";
import { raw } from "body-parser";

let handleCheckExistReport = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.userId || !data.postId) {
        return resolve({
          errMessage: "Missing required parameter",
          errorCode: -1,
        });
      }
      let report = await db.Report.findOne({
        where: { userId: data.userId, postId: data.postId },
        raw: false,
      });
      if (!report) {
        return resolve(false);
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

let handleCreateNewReport = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.userId || !data.postId || !data.reason || !data.discription) {
        return resolve({
          errMessage: "Missing required parameter",
          errorCode: -1,
        });
      }
      let checkExistReport = await handleCheckExistReport({
        userId: data.userId,
        postId: data.postId,
      });
      if (checkExistReport) {
        return resolve({
          errMessage: "You have already reported this post",
          errorCode: -1,
        });
      }
      let report = await db.Report.create({
        userId: data.userId,
        postId: data.postId,
        reason: data.reason,
        discription: data.discription,
        isChecked: 0,
      });
      resolve({
        errMessage: "Create new report successfully",
        errorCode: 0,
        data: report,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getAllReport = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let report = await db.Report.findAll({
        order: [["createdAt", "DESC"]],
      });
      resolve({
        errMessage: "Get all report successfully",
        errorCode: 0,
        data: report,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let handleCheckReport = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.reportId) {
        return resolve({
          errMessage: "Missing required parameter",
          errorCode: -1,
        });
      }
      let report = await db.Report.findOne({
        where: { id: data.reportId },
        raw: false,
      });
      if (!report) {
        return resolve({
          errMessage: "Report not found",
          errorCode: -1,
        });
      }
      report.isChecked = 1;
      await report.save();
      resolve({
        errMessage: "Check report successfully",
        errorCode: 0,
        data: report,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getReportByPostId = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.postId) {
        return resolve({
          errMessage: "Missing required parameter",
          errorCode: -1,
        });
      }
      let report = await db.Report.findAndCountAll({
        where: { postId: data.postId },
        order: [["createdAt", "DESC"]],
      });
      resolve({
        errMessage: "Get report by post id successfully",
        errorCode: 0,
        data: report.rows,
        count: report.count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleCreateNewReport: handleCreateNewReport,
  getAllReport: getAllReport,
  handleCheckReport: handleCheckReport,
  getReportByPostId: getReportByPostId,
};
