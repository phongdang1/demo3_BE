import companyService from "../services/companyService";

let getAllCompanies = async (req, res) => {
  try {
    let data = await companyService.getAllCompanies();
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get all companies failed",
      errorCode: -1,
    });
  }
};

const getCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await companyService.getCompanyById(id);
    
    if (!company) {
      return res.status(404).json({
        errMessage: "Company not found",
        errorCode: -1,
      });
    }
    console.log(company);
    return res.status(200).json(company);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errMessage: "Get company by ID failed",
      errorCode: -1,
    });
  }
};

module.exports = {
  getAllCompanies: getAllCompanies,
  getCompanyById,
};
