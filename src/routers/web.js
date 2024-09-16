import express from "express";
import postController from "../controllers/postController";
import userController from "../controllers/userController";
import companyController from "../controllers/companyController";
import authController from "../controllers/authController";
import allCodeController from "../controllers/allCodeController";

const router = express.Router();

let initWebRoutes = (app) => {
  //===================API USER========================//
  router.get("/getAllUsers", userController.getAllUsers);
  router.get("/getUserById", userController.getUsersById);
  router.post("/createNewUser", userController.handleCreateNewUser);
  router.post("/login", userController.handleLogin);

  //===================API AllCode========================//
  router.get("/getAllCode", allCodeController.getAllCode);
  router.post("/createNewCode", allCodeController.handleCreateNewAllCode);

  //==================API POST==========================//
  router.get("/getAllPost", postController.getAllPost);
  router.post("/createNewPost", postController.handleCreateNewPost);
  router.get("/getDetailPostById", postController.getDetailPostById);
  router.post("/updatePost", postController.handleUpdatePost);
  router.post("/banPost", postController.handleBanPost);
  router.post("unBanPost", postController.handleUnBanPost);
  router.post("/approvePost", postController.handleApprovePost);
  router.post("/reupPost", postController.handleReupPost);

  //==================API COMPANY==========================//
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
