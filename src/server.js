import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import connectDB from "./config/connectDB";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./utils/swaggerConfig";
import initWebRoutes from "./routers/web";
import passport from "./utils/passportConfig";
import CommonUtils from "./utils/CommonUtils";
import cors from "cors";
import session from "express-session";
import http from "http";
import { sendJobMail, checkReportPost } from "./utils/schedule";
import { Server as SocketServer } from "socket.io";

const { join } = require("node:path");
require("dotenv").config();

let app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: process.env.URL_REACT,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
global.ioGlobal = io;

global.ioGlobal.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    socket.join(userId);
  }
  socket.on("disconnect", () => {});
});
app.use(
  cors({
    origin: process.env.URL_REACT,
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false, // Không lưu lại session nếu không có thay đổi
    saveUninitialized: false, // Không lưu session trống
    cookie: {
      secure: process.env.NODE_ENV === "development",
      maxAge: 1000 * 60 * 60 * 24, // Thời gian sống của cookie (1 ngày)
    },
  })
);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    let user = req;
    console.log(user);
    let token = CommonUtils.encodeToken(user.id);

    res.redirect(`${process.env.URL_REACT}?token=${token}`);
  }
);

// Cấu hình session

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
viewEngine(app);
//sendJobMail();
//checkReportPost();
connectDB();
initWebRoutes(app);

let port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`App is running at the port ${port}`);
});
