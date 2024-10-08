import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import connectDB from "./config/connectDB";
const sendJobMail = require("./utils/schedule");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./utils/swaggerConfig");
const initWebRoutes = require("./routers/web");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("dotenv").config();

let app = express();

app.use(
  cors({
    origin: process.env.URL_REACT, // Domain React của bạn
    credentials: true,
  })
);

//limit 50mb
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
viewEngine(app);
sendJobMail();
connectDB();
initWebRoutes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running at the port ${port}`);
});
