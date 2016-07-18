var express = require("express");
var app = express();
var path = require("path");
var index = require("./routes/index.js");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo");

app.use(require("express-session")({
  secret: "This is a test secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.searializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", index);

app.set("port", process.env.PORT || 3000);

app.listen((app.get('port')), function(){
  console.log("Listening on port: 3000");
});
