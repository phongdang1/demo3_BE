import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import connectDB from "./config/connectDB";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./utils/swaggerConfig";
import initWebRoutes from "./routers/web";
import passport from "./utils/passportConfig";
import cookieSession from "cookie-session";
import cors from "cors";
import session from "express-session";
import http from "http";
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
  console.log("userId", userId);
  if (userId) {
    socket.join(userId);
    console.log("User connected:", socket.id);
  }
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Cấu hình session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.URL_REACT,
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
viewEngine(app);
connectDB();
initWebRoutes(app);

let port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`App is running at the port ${port}`);
});
