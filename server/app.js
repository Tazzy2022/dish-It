const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// logging middleware
app.use(morgan("dev"));

app.use(cors());

// body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// auth and api routes
app.use("/api", require("./api"));
app.use("/auth", require("./auth/authRouter"));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/bundle.js"));
});

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

module.exports = app;
