import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";

import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import cors from "cors";

import error from "./middleware/error";
const path = require("path");

require("dotenv").config();
require("express-async-errors");

const app = express();
const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", true);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  cookieParser(),
  jsonParser,
  urlencodedParser,
  morgan("tiny"),
  cors("*")
);

/**
 * @TODO uncumment after refactor model and controller
 */
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use(error);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

/**
 * @TODO
 * create connection with database
 */
app.listen(process.env.PORT || 4000, () => {
  console.log("server on run");
});
