import postService from "../services/postService";

let getAllPost = async (req, res) => {
  try {
    let data = await postService.getAllPost(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleCreateNewPost = async (req, res) => {
  try {
    let data = await postService.handleCreateNewPost(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getDetailPostById = async (req, res) => {
  try {
    let data = await postService.getDetailPostById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleUpdatePost = async (req, res) => {
  try {
    let data = await postService.handleUpdatePost(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleBanPost = async (req, res) => {
  try {
    let data = await postService.handleBanPost(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleUnBanPost = async (req, res) => {
  try {
    let data = await postService.handleUnBanPost(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleApprovePost = async (req, res) => {
  try {
    let data = await postService.handleApprovePost(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleReupPost = async (req, res) => {
  try {
    let data = await postService.handleReupPost(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  getAllPost: getAllPost,
  handleCreateNewPost: handleCreateNewPost,
  getDetailPostById: getDetailPostById,
  handleUpdatePost: handleUpdatePost,
  handleBanPost: handleBanPost,
  handleUnBanPost: handleUnBanPost,
  handleApprovePost: handleApprovePost,
  handleReupPost: handleReupPost,
};
