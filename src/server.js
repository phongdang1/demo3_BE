import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import doLoginWithGoogle from "./utils/passportConfig";
import connectDB from "./config/connectDB";
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
connectDB();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(
  cookieSession({
    maxAge: 15 * 24 * 60 * 60 * 1000,
    keys: "randomstring",
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get("/auth/google/callback", (req, res, next) => {
  passport.authenticate(
    "google",

    {
      successRedirect: "http://localhost:5173/",
      failureRedirect: "/login",
      failureMessage: true,
    },

    async (error, user, info) => {
      if (error) {
        return res.send({ message: error.message });
      }
      if (user) {
        try {
          const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.SECRET_STRING,
            { expiresIn: "15d" }
          );
          // gửi token và user về cho client qua cookie
          res.cookie("token", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
          });
          return res.redirect("http://localhost:5173/");
        } catch (error) {
          // error msg
          return res.send({ message: error.message });
        }
      }
    }
  )(req, res, next);
});
initWebRoutes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running at the port ${port}`);
});
