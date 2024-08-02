import express from "express";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("Hello World");
  });
  router.get("/get-all-users", userController.getAllUsers);

  return app.use("/", router);
};

module.exports = initWebRoutes;
