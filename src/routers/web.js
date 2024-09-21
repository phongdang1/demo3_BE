import express from "express";
import postController from "../controllers/postController";
import userController from "../controllers/userController";
import companyController from "../controllers/companyController";
import authController from "../controllers/authController";
import allCodeController from "../controllers/allCodeController";
import skillController from "../controllers/skillController";

const router = express.Router();

let initWebRoutes = (app) => {
  //===================API USER========================//
  router.get("/getAllUsers", userController.getAllUsers);
  router.get("/getAllUsersWithLimit", userController.getAllUsersWithLimit);
  router.get("/getUserById", userController.getUsersById);
  router.post("/createNewUser", userController.handleCreateNewUser);
  router.post("/login", userController.handleLogin);
  router.post("/setDataUserDetail", userController.handleSetDataUserDetail);

  //===================API AllCode========================//
  router.get("/getAllCode", allCodeController.getAllCode);
  router.post("/createNewCode", allCodeController.handleCreateNewAllCode);
  router.post("/updateCode", allCodeController.handleUpdateAllCode);

  //===================API SKILL========================//
  router.post("/createNewSkill", skillController.handleCreateNewSkill);
  router.post("/deleteSkill", skillController.handleDeleteSkill);
  router.get("/getAllSkillByCategory", skillController.getAllSkillByCategory);
  router.get("/getSkillById", skillController.getSkillById);
  router.post("/updateSkill", skillController.handleUpdateSkill);

  //==================API POST==========================//
  router.get("/getAllPostWithLimit", postController.getAllPostWithLimit);
  router.get("/getAllPost", postController.getAllPost);
  router.post("/createNewPost", postController.handleCreateNewPost);
  router.get("/getDetailPostById", postController.getDetailPostById);
  router.post("/updatePost", postController.handleUpdatePost);
  router.post("/banPost", postController.handleBanPost);
  router.post("unBanPost", postController.handleUnBanPost);
  router.post("/approvePost", postController.handleApprovePost);
  router.post("/reupPost", postController.handleReupPost);

  //==================API COMPANY==========================//
  router.get(
    "/getAllCompaniesWithLimit",
    companyController.getAllCompaniesWithLimit
  );
  router.get("/getAllCompanies", companyController.getAllCompanies);
  router.post("/createNewCompany", companyController.handleCreateNewCompany);
  router.post("/addUserToCompany", companyController.handleAddUserToCompany);
  router.get("/getCompanyById", companyController.getCompanyById);
  router.post("/updateCompany", companyController.handleUpdateCompany);
  router.post("/banCompany", companyController.handleBanCompany);
  router.post("/unBanCompany", companyController.handleUnBanCompany);
  router.get("/getCompanyByUserId", companyController.getCompanyByUserId);
  router.get("/getAllUserOfCompany", companyController.getAllUserOfCompany);

  //===================API GOOGLE========================//
  router.get("/auth/google", authController.googleAuthenticate);

  router.get(
    "/auth/google/callback",
    authController.googleAuthenticateCallback
  );

  return app.use("/", router);
};

module.exports = initWebRoutes;
