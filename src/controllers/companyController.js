import companyService from "../services/companyService";

let getAllCompaniesWithLimit = async (req, res) => {
  try {
    let data = await companyService.getAllCompaniesWithLimit(req.query);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get all companys failed",
      errorCode: -1,
    });
  }
};
let getAllCompanies = async (req, res) => {
  try {
    let data = await companyService.getAllCompanies(req.query);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get all companys failed",
      errorCode: -1,
    });
  }
};
let handleCreateNewCompany = async (req, res) => {
  try {
    let data = await companyService.handleCreateNewCompany(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Create new company failed",
      errorCode: -1,
    });
  }
};
let handleAddUserToCompany = async (req, res) => {
  try {
    let data = await companyService.handleAddUserToCompany(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Add user to company failed",
      errorCode: -1,
    });
  }
};

let getCompanyById = async (req, res) => {
  try {
    let data = await companyService.getCompanyById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get company by id failed",
      errorCode: -1,
    });
  }
};
let handleUpdateCompany = async (req, res) => {
  try {
    let data = await companyService.handleUpdateCompany(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Update company failed",
      errorCode: -1,
    });
  }
};
let handleBanCompany = async (req, res) => {
  try {
    let data = await companyService.handleBanCompany(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Ban company failed",
      errorCode: -1,
    });
  }
};
let handleUnBanCompany = async (req, res) => {
  try {
    let data = await companyService.handleUnBanCompany(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Unban company failed",
      errorCode: -1,
    });
  }
};

let getCompanyByUserId = async (req, res) => {
  try {
    let data = await companyService.getCompanyByUserId(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get company by user id failed",
      errorCode: -1,
    });
  }
};
let getAllUserOfCompany = async (req, res) => {
  try {
    let data = await companyService.getAllUserOfCompany(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get all user of company failed",
      errorCode: -1,
    });
  }
};
let handleApproveCompany = async (req, res) => {
  try {
    let data = await companyService.handleApproveCompany(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Approve company failed",
      errorCode: -1,
    });
  }
};

let getAllCompaniesWithLimitInactive = async (req, res) => {
  try {
    let data = await companyService.getAllCompaniesWithLimitInactive(req.query);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get all companys failed",
      errorCode: -1,
    });
  }
};
let handleRejectCompany = async (req, res) => {
  try {
    let data = await companyService.handleRejectCompany(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Reject company failed",
      errorCode: -1,
    });
  }
};

let getAllCompaniesInactive = async (req, res) => {
  try {
    let data = await companyService.getAllCompaniesInactive(req.query);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get all companys failed",
      errorCode: -1,
    });
  }
};
let getPointOfCompany = async (req, res) => {
  try {
    let data = await companyService.getPointOfCompany(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get point of company failed",
      errorCode: -1,
    });
  }
};

let exchangePointToPost = async (req, res) => {
  try {
    let data = await companyService.exchangePointToPost(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Exchange point to post failed",
      errorCode: -1,
    });
  }
};

let exchangePointToView = async (req, res) => {
  try {
    let data = await companyService.exchangePointToView(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Exchange point to view failed",
      errorCode: -1,
    });
  }
};

module.exports = {
  getAllCompaniesWithLimit: getAllCompaniesWithLimit,
  getAllCompanies: getAllCompanies,
  handleCreateNewCompany: handleCreateNewCompany,
  handleAddUserToCompany: handleAddUserToCompany,
  getCompanyById: getCompanyById,
  handleUpdateCompany: handleUpdateCompany,
  handleBanCompany: handleBanCompany,
  handleUnBanCompany: handleUnBanCompany,
  getCompanyByUserId: getCompanyByUserId,
  getAllUserOfCompany: getAllUserOfCompany,
  handleApproveCompany: handleApproveCompany,
  getAllCompaniesWithLimitInactive: getAllCompaniesWithLimitInactive,
  handleRejectCompany: handleRejectCompany,
  getAllCompaniesInactive: getAllCompaniesInactive,
  getPointOfCompany: getPointOfCompany,
  exchangePointToPost: exchangePointToPost,
  exchangePointToView: exchangePointToView,
};
