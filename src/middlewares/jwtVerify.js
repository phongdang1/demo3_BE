const jwt = require("jsonwebtoken");
import db from "../models/index";
require("dotenv").config();

const secretString = process.env.SECRET_STRING;
const middleware = async (req, res, next) => {
  (jwt.verifyTokenUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, secretString, async (err, payload) => {
        if (err) {
          return res.status(403).json({
            status: false,
            errorMessage: "Token is invalid",
            refresh: true,
          });
        }
        const user = await db.User.findOne({
          where: {
            id: payload.sub,
          },
          attributes: {
            exclude: ["userId"],
          },
        });
        if (!user) {
          return res.status(404).json({
            status: false,
            errorMessage: "User not found",
            refresh: true,
          });
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(403).json({
        status: false,
        errorMessage: "Token is required",
        refresh: true,
      });
    }
  }),
    (verifyTokenAdmin = (req, res, next) => {
      const token = req.headers.authorization;
      if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, secretString, async (err, payload) => {
          if (err) {
            return res.status(403).json({
              status: false,
              errorMessage: "Token is invalid",
              refresh: true,
            });
          }
          const user = await db.User.findOne({
            where: {
              id: payload.sub,
            },
            attributes: {
              exclude: ["userId"],
            },
            raw: true,
            nest: true,
          });
          if (!user) {
            return res.status(404).json({
              status: false,
              errorMessage: "User not found",
              refresh: true,
            });
          }
          if (user.role !== "ADMIN") {
            return res.status(403).json({
              status: false,
              errorMessage: "You are not authorized to perform this action",
              refresh: true,
            });
          }
          req.user = user;
          next();
        });
      } else {
        return res.status(401).json({
          status: false,
          errorMessage: "You're not authentication!",
          refresh: true,
        });
      }
    });
};

module.exports = middleware;
