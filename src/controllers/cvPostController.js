import cvPostService from "../services/cvPostService";

let handleApplyJob = async (req, res) => {
  try {
    let data = await cvPostService.handleApplyJob(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Apply job failed",
      errorCode: -1,
    });
  }
};

let getAllListCvByPost = async (req, res) => {
  try {
    let data = await cvPostService.getAllListCvByPost(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get all list cv by post failed",
      errorCode: -1,
    });
  }
};

let getDetailCvPostById = async (req, res) => {
  try {
    let data = await cvPostService.getDetailCvPostById(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get detail cv failed",
      errorCode: -1,
    });
  }
};
let getAllCvPostByUserId = async (req, res) => {
  try {
    let data = await cvPostService.getAllCvPostByUserId(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get all cv post by user id failed",
      errorCode: -1,
    });
  }
};
let handleFindCv = async (req, res) => {
  try {
    let data = await cvPostService.handleFindCv(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "handleFindCv failed",
      errorCode: -1,
    });
  }
};

let checkViewCompany = async (req, res) => {
  try {
    let data = await cvPostService.checkViewCompany(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Check view company failed",
      errorCode: -1,
    });
  }
};
let getAllCvPostByCompanyId = async (req, res) => {
  try {
    let data = await cvPostService.getAllCvPostByCompanyId(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get all cv post by company id failed",
      errorCode: -1,
    });
  }
};
let createInterviewSchedule = async (req, res) => {
  try {
    let data = await cvPostService.createInterviewSchedule(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Create interview schedule failed",
      errorCode: -1,
    });
  }
};
let handleApproveCvPost = async (req, res) => {
  try {
    let data = await cvPostService.handleApproveCvPost(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Approve cv post failed",
      errorCode: -1,
    });
  }
};
let handleRejectCvPost = async (req, res) => {
  try {
    let data = await cvPostService.handleRejectCvPost(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Reject cv post failed",
      errorCode: -1,
    });
  }
};

let getAllInterViewSchedule = async (req, res) => {
  try {
    let data = await cvPostService.getAllInterViewSchedule();
    return res.status(200).json(data);
  } catch {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get all interview fail",
      errorCode: -1,
    });
  }
};
let getInterviewScheduleByCvPost = async (req, res) => {
  try {
    let data = await cvPostService.getInterviewScheduleByCvPost(req.query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errMessage: "Get interview by CvPost fail",
      errorCode: -1,
    });
  }
};

let testCommon = async (req, res) => {
  try {
    let data = await cvPostService.testCommon();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get detail cv failed",
      errorCode: -1,
    });
  }
};

module.exports = {
  handleApplyJob: handleApplyJob,
  getAllListCvByPost: getAllListCvByPost,
  getDetailCvPostById: getDetailCvPostById,
  getAllCvPostByUserId: getAllCvPostByUserId,
  handleFindCv: handleFindCv,
  checkViewCompany: checkViewCompany,
  getAllCvPostByCompanyId: getAllCvPostByCompanyId,
  createInterviewSchedule: createInterviewSchedule,
  handleApproveCvPost: handleApproveCvPost,
  handleRejectCvPost: handleRejectCvPost,
  getAllInterViewSchedule: getAllInterViewSchedule,
  getInterviewScheduleByCvPost: getInterviewScheduleByCvPost,

  testCommon: testCommon,
};
