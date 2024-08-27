import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";

import connectDB from "./config/connectDB";
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./utils/swaggerConfig");
const initWebRoutes = require("./routers/web");

require("dotenv").config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
connectDB();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/", initWebRoutes);

let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running at the port ${port}`);
});
