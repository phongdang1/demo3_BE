import express from "express";
import postController from "../controllers/postController";
import middlewareControllers from "../middlewares/jwtVerify";
import userController from "../controllers/userController";
import companyController from "../controllers/companyController";

const router = express.Router();

let initWebRoutes = (app) => {
  /**
   * @swagger
   * /example:
   *   get:
   *     summary: Returns a list of examples
   *     responses:
   *       200:
   *         description: A list of examples
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: string
   */
  router.get("/example", (req, res) => {
    res.json(["example1", "example2"]);
  });

  router.get(
    "/get-all-users",
    middlewareControllers.verifyTokenAdmin,
    userController.getAllUsers
  );
  router.post("/create-new-user", userController.handleCreateNewUser);
  router.post("/login", userController.handleLogin);

  //===================API ALLCODE========================//

  //==================API POST==========================//
  router.get("/get-all-post", postController.getAllPost);

  //==================API COMPANY==========================//
  router.get("/get-all-companys", companyController.getAllCompanies);

  return app.use("/", router);
};

module.exports = initWebRoutes;
