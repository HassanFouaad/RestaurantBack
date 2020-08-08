var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let cors = require("cors");
const mongoose = require("mongoose");
const dbOpper = require("./operations");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
let dishRouter = require("./routes/dishRouter");
let promoRouter = require("./routes/promoRouter");
let leaderRouter = require("./routes/leaderRouter");
const uploadRouter = require("./routes/uploadRouter");
const commentRouter = require("./routes/commentRouter");
const favouriteRouter = require("./routes/favoriteRouter");
let session = require("express-session");
let fileStore = require("session-file-store")(session);
let passport = require("passport");
let authenticate = require("./authenticate");
let config = require("./config");
/* const { connect } = require("http2"); */
const mongourl = config.mongourl;
const connect = mongoose.connect(mongourl, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
var app = express();
// Secure traffic only
app.all("*", (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    res.redirect(
      307,
      "https://" + req.hostname + ":" + app.get("secPort") + req.url
    );
  }
});

connect.then(
  (db) => {
    console.log("Conncted to the database server!");
  },
  (err) => {
    console.log(err);
  }
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(cookieParser("I Love Me ;) I'm AweSoMe"));
app.use(express.static("public"));
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);
app.use("/imageUpload", uploadRouter);
app.use("/favorites", favouriteRouter);
app.use("/comments", commentRouter);
app.use(express.static("build"));
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
