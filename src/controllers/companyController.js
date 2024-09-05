import companyService from "../services/companyService";

let getAllCompanies = async (req, res) => {
  try {
    let data = await companyService.getAllCompanies();
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

module.exports = {
  getAllCompanies: getAllCompanies,
};
