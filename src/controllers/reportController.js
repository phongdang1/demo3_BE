import reportService from "../services/reportService";

let handleCreateNewReport = async (req, res) => {
  try {
    let data = await reportService.handleCreateNewReport(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Create new report failed",
      errorCode: -1,
    });
  }
};
let getAllReport = async (req, res) => {
  try {
    let data = await reportService.getAllReport();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get all report failed",
      errorCode: -1,
    });
  }
};
let handleCheckReport = async (req, res) => {
  try {
    let data = await reportService.handleCheckReport(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Check report failed",
      errorCode: -1,
    });
  }
};
let getReportByPostId = async (req, res) => {
  try {
    let data = await reportService.getReportByPostId(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get report by post id failed",
      errorCode: -1,
    });
  }
};

module.exports = {
  handleCreateNewReport: handleCreateNewReport,
  getAllReport: getAllReport,
  handleCheckReport: handleCheckReport,
  getReportByPostId: getReportByPostId,
};
