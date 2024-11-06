import e from "express";
import db from "../models/index";
import { raw } from "body-parser";

let getAllNotificationByUserId = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.userId) {
        return resolve({
          errMessage: "Missing required parameter",
          errorCode: -1,
        });
      }
      console.log("aa", data.userId);
      let notification = await db.Notification.findAll({
        where: { userId: data.userId },
        order: [["createdAt", "DESC"]],
      });
      console.log("bb", notification);
      resolve({
        errMessage: "get all notification successfully",
        errorCode: 0,
        data: notification,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let handleCheckNotification = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.notificationId) {
        return resolve({
          errMessage: "Missing required parameter",
          errorCode: -1,
        });
      }
      let notification = await db.Notification.findOne({
        where: { id: data.notificationId },
        raw: false,
      });
      if (!notification) {
        return resolve({
          errMessage: "Notification not found",
          errorCode: -1,
        });
      }
      notification.isChecked = 1;
      await notification.save();
      resolve({
        errMessage: "Check notification successfully",
        errorCode: 0,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllNotificationByUserId: getAllNotificationByUserId,
  handleCheckNotification: handleCheckNotification,
};
