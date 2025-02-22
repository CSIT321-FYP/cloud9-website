const express = require("express");
const app = express();
const path = require("path");
const routerMiddleware = require("./middleware/routerMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

// Allow CORS from your frontend domain
// app.use(cors());

// Load environment variables
require("dotenv").config({
  override: true,
});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport and use session
app.use(passport.initialize());

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/views/assets", express.static("./views/assets/"));
app.use("/img", express.static("./views/assets/img"));

app.get("/", (req, res, next) => {
  res.render("index");
});
app.get("/login", (req, res, next) => {
  res.render("loginPage");
});

// Set middleware
app.use("/", routerMiddleware);
app.use("/", errorMiddleware);

// Start server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
