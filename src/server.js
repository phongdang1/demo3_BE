import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import connectDB from "./config/connectDB";
const sendJobMail = require("./utils/schedule");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./utils/swaggerConfig");
const initWebRoutes = require("./routers/web");
const passport = require("./utils/passportConfig");
const cookieSession = require("cookie-session");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const socketIo = require("socket.io");
const session = require("express-session");

require("dotenv").config();

let app = express();
const server = require("http").createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

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
//sendJobMail();
connectDB();
initWebRoutes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running at the port ${port}`);
});
