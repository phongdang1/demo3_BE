import userService from "../services/userService";

let getAllCompanys = async (req, res) => {
  try {
    let data = await userService.getAllUsers();
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

module.exports = {
    getAllCompanys: getAllCompanys,
};
