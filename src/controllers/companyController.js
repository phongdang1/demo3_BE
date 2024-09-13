import companyService from "../services/companyService";

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
    let data = await companyService.getCompanyById(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get company by id failed",
      errorCode: -1,
    });
  }
};

module.exports = {
  getAllCompanies: getAllCompanies,
  handleCreateNewCompany: handleCreateNewCompany,
  handleAddUserToCompany: handleAddUserToCompany,
  getCompanyById: getCompanyById,
};
