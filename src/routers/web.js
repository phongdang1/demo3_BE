import express from "express";
import postController from "../controllers/postController";
import middlewareControllers from "../middlewares/jwtVerify";
import userController from "../controllers/userController";
import CommonUtils from "../utils/CommonUtils";
import companyController from "../controllers/companyController";
import passport from "passport";

const router = express.Router();

let initWebRoutes = (app) => {
  //===================API USER========================//
  router.get("/get-all-users", userController.getAllUsers);
  router.get("/get-user-by-id", userController.getUsersById);

  router.post("/create-new-user", userController.handleCreateNewUser);
  router.post("/login", userController.handleLogin);

  //===================API ALLCODE========================//
  router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
    }),
    async function (req, res) {
      try {
        if (req.user) {
          const token = await CommonUtils.encodeToken(req.user.id);
          console.log("token", token);
          console.log("req.user", req.user);
          return res.status(200).json({
            errCode: 0,
            errMessage: "Login succeed",
            user: req.user,
            token,
          });
        }
      } catch (error) {
        return res.status(200).json({
          errCode: -1,
          errMessage: "Error from server",
        });
      }
    }
  );
  //==================API POST==========================//
  router.get("/get-all-post", postController.getAllPost);

  //==================API COMPANY==========================//
  router.get("/get-all-companys", companyController.getAllCompanies);

  return app.use("/", router);
};

module.exports = initWebRoutes;
