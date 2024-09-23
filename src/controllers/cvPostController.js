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
    let data = await cvPostService.getAllListCvByPost(req.query.postId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get list cv failed",
      errorCode: -1,
    });
  }
};

let getDetailCvPostById = async (req, res) => {
  try {
    let data = await cvPostService.getDetailCvPostById(req.body);
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
};
