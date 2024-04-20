const express = require("express");
const router = express.Router();
const {
  renderLoginPage,
  renderRegisterPage,
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

// Render the login page and handle login form submission
router.route("/login").get(renderLoginPage).post(loginUser);

// Render the register page and handle registration form submission
router.route("/register").get(renderRegisterPage).post(registerUser);

// Handle logout request
router.route("/logout").get(logoutUser);

module.exports = router;
