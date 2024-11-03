import express from "express";
import postController from "../controllers/postController";
import userController from "../controllers/userController";
import companyController from "../controllers/companyController";
import authController from "../controllers/authController";
import allCodeController from "../controllers/allCodeController";
import skillController from "../controllers/skillController";
import cvPostController from "../controllers/cvPostController";
import packageController from "../controllers/packageController";
const passport = require("passport");

const router = express.Router();

let initWebRoutes = (app) => {
  //===================API USER========================//
  router.get("/getAllUsers", userController.getAllUsers);
  router.get("/getAllUsersWithLimit", userController.getAllUsersWithLimit);
  router.get("/getUserById", userController.getUsersById);
  router.post("/createNewUser", userController.handleCreateNewUser);
  router.post("/login", userController.handleLogin);
  router.post("/setDataUserDetail", userController.handleSetDataUserDetail);
  router.post("/forgotPassword", userController.handleForgotPassword);
  router.post("/changePassword", userController.handleChangePassword);

  //===================API AllCode========================//
  router.get("/getAllCodeByType", allCodeController.getAllCodeByType);
  router.get("/getAllCode", allCodeController.getAllCode);
  router.get("/getValueByCode", allCodeController.getValueByCode);
  router.post("/createNewCode", allCodeController.handleCreateNewAllCode);
  router.post("/updateCode", allCodeController.handleUpdateAllCode);
  router.post("/deleteCode", allCodeController.handleDeleteAllCode);

  //===================API SKILL========================//
  router.post("/createNewSkill", skillController.handleCreateNewSkill);
  router.post("/deleteSkill", skillController.handleDeleteSkill);
  router.get("/getAllSkillByCategory", skillController.getAllSkillByCategory);
  router.get("/getAllSkillWithLimit", skillController.getAllSkillWithLimit);
  router.get("/getAllSkill", skillController.getAllSkill);
  router.get("/getSkillById", skillController.getSkillById);
  router.post("/updateSkill", skillController.handleUpdateSkill);

  //==================API POST==========================//
  router.get("/getAllPostWithLimit", postController.getAllPostWithLimit);
  router.get("/getAllPost", postController.getAllPost);
  router.post("/createNewPost", postController.handleCreateNewPost);
  router.get("/getDetailPostById", postController.getDetailPostById);
  router.post("/updatePost", postController.handleUpdatePost);
  router.post("/banPost", postController.handleBanPost);
  router.post("/unBanPost", postController.handleUnBanPost);
  router.post("/approvePost", postController.handleApprovePost);
  router.post("/reupPost", postController.handleReupPost);
  router.post("/rejectPost", postController.handleRejectPost);

  //==================API CV_POST==========================//
  router.post("/applyJob", cvPostController.handleApplyJob);
  router.get("/getAllListCvByPost", cvPostController.getAllListCvByPost);
  router.get("/getDetailCvPostById", cvPostController.getDetailCvPostById);
  router.get("/getAllCvPostByUserId", cvPostController.getAllCvPostByUserId);
  router.post("/handleFindCv", cvPostController.handleFindCv);
  router.get("/checkViewCompany", cvPostController.checkViewCompany);
  router.get(
    "/getAllCvPostByCompanyId",
    cvPostController.getAllCvPostByCompanyId
  );
  router.get(
    "/getAllInterViewSchedule",
    cvPostController.getAllInterViewSchedule
  );
  router.get(
    "/getInterviewScheduleByCvPost",
    cvPostController.getInterviewScheduleByCvPost
  );
  router.post(
    "/createInterviewSchedule",
    cvPostController.createInterviewSchedule
  );
  router.post("/handleApproveCvPost", cvPostController.handleApproveCvPost);
  router.post("/handleRejectCvPost", cvPostController.handleRejectCvPost);

  router.get("/testCommon", cvPostController.testCommon);

  //==================API COMPANY==========================//
  router.get(
    "/getAllCompaniesWithLimit",
    companyController.getAllCompaniesWithLimit
  );
  router.get("/getAllCompanies", companyController.getAllCompanies);
  router.get(
    "/getAllCompaniesWithLimitInactive",
    companyController.getAllCompaniesWithLimitInactive
  );
  router.get(
    "/getAllCompaniesInactive",
    companyController.getAllCompaniesInactive
  );
  router.post("/createNewCompany", companyController.handleCreateNewCompany);
  router.post("/addUserToCompany", companyController.handleAddUserToCompany);
  router.get("/getCompanyById", companyController.getCompanyById);
  router.post("/updateCompany", companyController.handleUpdateCompany);
  router.post("/banCompany", companyController.handleBanCompany);
  router.post("/unBanCompany", companyController.handleUnBanCompany);
  router.get("/getCompanyByUserId", companyController.getCompanyByUserId);
  router.get("/getAllUserOfCompany", companyController.getAllUserOfCompany);
  router.post("/approveCompany", companyController.handleApproveCompany);
  router.post("/rejectCompany", companyController.handleRejectCompany);

  //===================API PACKAGE========================//
  router.post("/createNewPackage", packageController.handleCreateNewPackage);
  router.post("/updatePackage", packageController.handleUpdatePackage);
  router.post("/activePackage", packageController.handleActivePackage);
  router.post("/deactivePackage", packageController.handleDeactivePackage);
  router.get("/getAllPackage", packageController.getAllPackage);
  router.get("/getPackageById", packageController.getPackageById);
  router.post("/createPayment", packageController.createPayment);
  router.post("/executePayment", packageController.executePayment);
  router.get("/getPackageByType", packageController.getPackageByType);

  //===================API GOOGLE========================//
  router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email"] })
  );

  router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      console.log("req.user");
    }
  );
  //===================API OTP========================//
  router.post("/sendOtp", authController.handleSendOtp);
  router.post("/verifyOtp", authController.handleVerifyOtp);

  return app.use("/", router);
};

module.exports = initWebRoutes;
