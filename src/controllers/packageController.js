const packageService = require("../services/packageService");

let handleCreateNewPackage = async (req, res) => {
  try {
    let data = await packageService.handleCreateNewPackage(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Create new package failed",
      errorCode: -1,
    });
  }
};

let handleUpdatePackage = async (req, res) => {
  try {
    let data = await packageService.handleUpdatePackage(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Update package failed",
      errorCode: -1,
    });
  }
};

let handleActivePackage = async (req, res) => {
  try {
    let data = await packageService.handleActivePackage(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Active package failed",
      errorCode: -1,
    });
  }
};

let handleDeactivePackage = async (req, res) => {
  try {
    let data = await packageService.handleDeactivePackage(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Deactive package failed",
      errorCode: -1,
    });
  }
};

let getAllPackage = async (req, res) => {
  try {
    let data = await packageService.getAllPackage(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get all package failed",
      errorCode: -1,
    });
  }
};
let getPackageById = async (req, res) => {
  try {
    let data = await packageService.getPackageById(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get package by id failed",
      errorCode: -1,
    });
  }
};
let createPaymentViewCv = async (req, res) => {
  try {
    let data = await packageService.createPaymentViewCv(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Create payment failed",
      errorCode: -1,
    });
  }
};

let executePaymentViewCV = async (req, res) => {
  try {
    let data = await packageService.executePaymentViewCV(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Execute payment failed",
      errorCode: -1,
    });
  }
};
let createPaymentHotPost = async (req, res) => {
  try {
    let data = await packageService.createPaymentHotPost(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Create payment failed",
      errorCode: -1,
    });
  }
};
let executePaymentHotPost = async (req, res) => {
  try {
    let data = await packageService.executePaymentHotPost(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Execute payment failed",
      errorCode: -1,
    });
  }
};
let getPackageByType = async (req, res) => {
  try {
    let data = await packageService.getPackageByType(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get package by type failed",
      errorCode: -1,
    });
  }
};

module.exports = {
  handleCreateNewPackage: handleCreateNewPackage,
  handleUpdatePackage: handleUpdatePackage,
  handleActivePackage: handleActivePackage,
  handleDeactivePackage: handleDeactivePackage,
  getAllPackage: getAllPackage,
  getPackageById: getPackageById,
  createPaymentViewCv: createPaymentViewCv,
  executePaymentViewCV: executePaymentViewCV,
  getPackageByType: getPackageByType,
  createPaymentHotPost: createPaymentHotPost,
  executePaymentHotPost: executePaymentHotPost,
};
