import skillService from "../services/skillService";

let handleCreateNewSkill = async (req, res) => {
  try {
    let data = await skillService.handleCreateNewSkill(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Create new skill failed",
      errorCode: -1,
    });
  }
};
let handleDeleteSkill = async (req, res) => {
  try {
    let data = await skillService.handleDeleteSkill(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Delete skill failed",
      errorCode: -1,
    });
  }
};

let getAllSkillByCategory = async (req, res) => {
  try {
    let data = await skillService.getAllSkillByCategory(
      req.query.categoryJobCode
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get all skill by category failed",
      errorCode: -1,
    });
  }
};

let handleUpdateSkill = async (req, res) => {
  try {
    let data = await skillService.handleUpdateSkill(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Update skill failed",
      errorCode: -1,
    });
  }
};
let getSkillById = async (req, res) => {
  try {
    let data = await skillService.getSkillById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errMessage: "Get skill by id failed",
      errorCode: -1,
    });
  }
};

module.exports = {
  handleCreateNewSkill: handleCreateNewSkill,
  handleDeleteSkill: handleDeleteSkill,
  getAllSkillByCategory: getAllSkillByCategory,
  getSkillById: getSkillById,
  handleUpdateSkill: handleUpdateSkill,
};
