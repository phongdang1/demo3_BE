import allCodeService from "../services/allCodeService";

let getAllCode = async (req, res) => {
  try {
    let data = await allCodeService.getAllCode(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get all code failed",
      errorCode: -1,
    });
  }
};
let handleCreateNewAllCode = async (req, res) => {
  try {
    let data = await allCodeService.handleCreateNewAllCode(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Create new allcode failed",
      errorCode: -1,
    });
  }
};

module.exports = {
  getAllCode: getAllCode,
  handleCreateNewAllCode: handleCreateNewAllCode,
};
