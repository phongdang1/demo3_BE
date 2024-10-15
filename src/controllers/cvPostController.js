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
    let data = await cvPostService.checkViewCompany(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Check view company failed",
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
  testCommon: testCommon,
};
