import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import doLoginWithGoogle from "./utils/passportConfig";
import connectDB from "./config/connectDB";
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./utils/swaggerConfig");
const initWebRoutes = require("./routers/web");
const session = require("express-session");

require("dotenv").config();

let app = express();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
connectDB();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
initWebRoutes(app);
doLoginWithGoogle();

let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running at the port ${port}`);
});
