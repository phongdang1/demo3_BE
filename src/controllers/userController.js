import userService from "../services/userService";

let getAllUsers = async (req, res) => {
  try {
    let data = await userService.getAllUsers(req.query);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get all users failed",
      errorCode: -1,
    });
  }
};
let getUsersById = async (req, res) => {
  try {
    let data = await userService.getUsersById(req.query.id);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get user by id failed",
      errorCode: -1,
    });
  }
};
//create user
let handleCreateNewUser = async (req, res) => {
  try {
    let data = await userService.handleCreateNewUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

//handle login
let handleLogin = async (req, res) => {
  try {
    let data = await userService.handleLogin(req.body);
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
  getAllUsers: getAllUsers,
  getUsersById: getUsersById,
  handleCreateNewUser: handleCreateNewUser,
  handleLogin: handleLogin,
};
