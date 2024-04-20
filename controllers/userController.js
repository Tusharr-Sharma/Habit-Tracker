const User = require("../models/userModel");

// Render the login page
const renderLoginPage = (req, res) => {
  res.render("login");
};

// Login a user
const loginUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      // If user doesn't exist, render the login page with an error message
      let errors = [];
      errors.push({ msg: "This email is not registered!" });
      res.render("login", {
        errors,
        name,
        email,
      });
    } else {
      // Redirect to the user's dashboard if user exists
      res.redirect(`/dashboard?user=${user.email}`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Render the register page
const renderRegisterPage = (req, res) => {
  res.render("register");
};

// Register a new user
const registerUser = async (req, res) => {
  const { name, email } = req.body;
  const errors = [];

  // Validate name and email fields
  if (!name || !email) {
    errors.push({ msg: "Please enter all fields!" });
  }

  if (errors.length > 0) {
    // Render the register page with error messages if validation fails
    res.render("register", {
      errors,
      name,
      email,
    });
  } else {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        // If user already exists, render the register page with an error message
        errors.push({ msg: "Email already exists!" });
        res.render("register", {
          errors,
          name,
          email,
        });
      } else {
        // Create a new user if it doesn't exist
        const newUser = new User({
          name,
          email,
        });
        await newUser.save();
        req.flash("success_msg", "Registered Successfully, You can now login!");
        res.redirect("/users/login");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }
};

// Logout the user
const logoutUser = (req, res) => {
  req.flash("success_msg", "You are logged out!");
  res.redirect("/users/login");
};

module.exports = {
  renderLoginPage,
  loginUser,
  renderRegisterPage,
  registerUser,
  logoutUser,
};
