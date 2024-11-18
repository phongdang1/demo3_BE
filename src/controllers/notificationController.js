import notificationService from "../services/notificationService";

let getAllNotificationByUserId = async (req, res) => {
  try {
    let data = await notificationService.getAllNotificationByUserId(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get all notification failed",
      errorCode: -1,
    });
  }
};

let handleCheckNotification = async (req, res) => {
  try {
    let data = await notificationService.handleCheckNotification(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Check notification failed",
      errorCode: -1,
    });
  }
};

module.exports = {
  getAllNotificationByUserId: getAllNotificationByUserId,
  handleCheckNotification: handleCheckNotification,
};
