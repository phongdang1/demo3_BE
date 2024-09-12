import express from "express";
import postController from "../controllers/postController";
import userController from "../controllers/userController";
import companyController from "../controllers/companyController";
import authController from "../controllers/authController";

const router = express.Router();

let initWebRoutes = (app) => {
  //===================API USER========================//
  router.get("/getAllUsers", userController.getAllUsers);
  router.get("/getUserById", userController.getUsersById);

  router.post("/createNewUser", userController.handleCreateNewUser);
  router.post("/login", userController.handleLogin);

  //===================API ALLCODE========================//
  router.get("/auth/google", authController.googleAuthenticate);

  router.get(
    "/auth/google/callback",
    authController.googleAuthenticateCallback
  );
  //==================API POST==========================//
  router.get("/getAllPost", postController.getAllPost);

  //==================API COMPANY==========================//
  router.get("/getAllCompanies", companyController.getAllCompanies);

  return app.use("/", router);
};

module.exports = initWebRoutes;
