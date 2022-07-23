const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
let morgan;

if (process.env.NODE_ENV === "development") {
  morgan = require("morgan");
}

const keys = require("./config/keys");
const googleAuth = require("./routes/googleAuth");
const folder = require("./routes/folder");
const globalErrorHandler = require("./controller/globalError");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// global middleware
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// api routes
app.use("/auth/google", googleAuth);
app.use("/api/v1/folder", folder);

// serve static build files in production
if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) => {
    app.use(express.static(__dirname + "/client/build"));
    if (!!req.user) {
      return res.redirect("/dashboard");
    }
    res.sendFile(__dirname + "/client/build/index.html");
  });

  app.use(express.static(__dirname + "/client/build"));
  app.get("/dashboard", (req, res) => {
    if (!req.user) {
      return res.redirect("/");
    }
    res.sendFile(__dirname + "/client/build/index.html");
  });

  app.get("/dashboard/:id", (req, res) => {
    if (!req.user) {
      return res.redirect("/");
    }
    res.sendFile(__dirname + "/client/build/index.html");
  });

  app.all("*", (req, res) => {
    if (!req.user) {
      return res.redirect("/");
    }
    res.sendFile(__dirname + "/client/build/index.html");
  });
}

// global error handler
app.use(globalErrorHandler);

module.exports = app;
