const express = require("express");
const dotenv = require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");
const colors = require("colors");
const flash = require("connect-flash");
const session = require("express-session");

const port = process.env.PORT || 5000;
const app = express();

const connectDb = require("./config/db.js");
console.log('prior')
connectDb();
console.log('after')

// Set up express-ejs-layouts
app.use(expressLayouts);

// Serve static assets from the "assets" directory
app.use("/assets", express.static("./views/assets"));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set up express-session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Set up flash messages
app.use(flash());

// Set up global variables for flash messages
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Set up routes
app.use("/", require("./routes/habitRoutes")); // Handles habit-related routes
app.use("/users", require("./routes/userRoutes")); // Handles user-related routes

// Start the server
app.listen(port, (err) => {
  if (err) {
    console.log(`${err}`.bgRed);
  }
  console.log(`Server is started on port: ${port}`.bgMagenta);
});
