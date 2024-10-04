import allCodeService from "../services/allCodeService";

let getAllCodeByType = async (req, res) => {
  try {
    let data = await allCodeService.getAllCodeByType(req.query.type);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get all code failed",
      errorCode: -1,
    });
  }
};
let getValueByCode = async (req, res) => {
  try {
    let data = await allCodeService.getValueByCode(req.query.code);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get value by code failed",
      errorCode: -1,
    });
  }
};
let getAllCode = async (req, res) => {
  try {
    let data = await allCodeService.getAllCode();
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
let handleUpdateAllCode = async (req, res) => {
  try {
    let data = await allCodeService.handleUpdateAllCode(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Update allcode failed",
      errorCode: -1,
    });
  }
};

module.exports = {
  getAllCodeByType: getAllCodeByType,
  handleCreateNewAllCode: handleCreateNewAllCode,
  handleUpdateAllCode: handleUpdateAllCode,
  getValueByCode: getValueByCode,
  getAllCode: getAllCode,
};
