import express from "express";
import postController from "../controllers/postController";
import middlewareControllers from "../middlewares/jwtVerify";
import userController from "../controllers/userController";
import CommonUtils from "../utils/CommonUtils";
import companyController from "../controllers/companyController";
import authController from "../controllers/authController";

import passport from "passport";

const router = express.Router();

let initWebRoutes = (app) => {
  //===================API USER========================//
  router.get("/get-all-users", userController.getAllUsers);
  router.get("/get-user-by-id", userController.getUsersById);

  router.post("/create-new-user", userController.handleCreateNewUser);
  router.post("/login", userController.handleLogin);

  //===================API ALLCODE========================//
  router.get("/auth/google", authController.googleAuthenticate);

  router.get(
    "/auth/google/callback",
    authController.googleAuthenticateCallback
  );
  //==================API POST==========================//
  router.get("/get-all-post", postController.getAllPost);

  //==================API COMPANY==========================//
  router.get("/get-all-companys", companyController.getAllCompanies);

  return app.use("/", router);
};

module.exports = initWebRoutes;
