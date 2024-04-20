const User = require("../models/userModel");
const Habit = require("../models/habitModel");
let email = "";

// Helper function to get the date string and day of the week
const getDateString = (n) => {
  const date = new Date();
  date.setDate(date.getDate() + n);
  const newDate = date
    .toLocaleDateString("pt-br")
    .split("/")
    .reverse()
    .join("-");
  let day = "";
  switch (date.getDay()) {
    case 0:
      day = "Sun";
      break;
    case 1:
      day = "Mon";
      break;
    case 2:
      day = "Tue";
      break;
    case 3:
      day = "Wed";
      break;
    case 4:
      day = "Thu";
      break;
    case 5:
      day = "Fri";
      break;
    case 6:
      day = "Sat";
      break;
  }
  return { date: newDate, day };
};

// Render the main page
const renderMainPage = (req, res) => {
  res.render("login");
};

// Render the dashboard and fetch user's habits and dates
const renderDashboard = async (req, res) => {
  email = req.query.user;
  try {
    const user = await User.findOne({ email: req.query.user });
    const habits = await Habit.find({ email: req.query.user });
    const days = [];
    // Get date and day strings for the next 7 days
    days.push(getDateString(0));
    days.push(getDateString(1));
    days.push(getDateString(2));
    days.push(getDateString(3));
    days.push(getDateString(4));
    days.push(getDateString(5));
    days.push(getDateString(6));
    res.render("dashboard", { habits, user, days });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Toggle user view between daily and weekly
const toggleUserView = async (req, res) => {
  try {
    const user = await User.findOne({ email });
    // Switch user's view between daily and weekly
    user.view = user.view === "daily" ? "weekly" : "daily";
    await user.save();
    return res.redirect("back");
  } catch (err) {
    console.log("Toggle Daily/Weekly view error, Try Again!");
    res.status(500).send("Internal Server Error");
  }
};

// Add a new habit
const addHabit = async (req, res) => {
  const { content } = req.body;
  try {
    const habit = await Habit.findOne({ content: content, email: email });
    if (habit) {
      const dates = habit.dates;
      const tzoffset = new Date().getTimezoneOffset() * 60000;
      const today = new Date(Date.now() - tzoffset).toISOString().slice(0, 10);
      const found = dates.find((item) => item.date === today);
      if (found) {
        console.log("Habit exists!");
        req.flash("error_msg", "Habit is already in your track!");
        return res.redirect("back");
      } else {
        // Add a new date for the habit if it doesn't exist for today
        dates.push({ date: today, complete: "none" });
        habit.dates = dates;
        await habit.save();
        return res.redirect("back");
      }
    } else {
      // Create a new habit and add the current date
      const dates = [];
      const tzoffset = new Date().getTimezoneOffset() * 60000;
      const localISOTime = new Date(Date.now() - tzoffset)
        .toISOString()
        .slice(0, 10);
      dates.push({ date: localISOTime, complete: "none" });
      const newHabit = new Habit({
        content,
        email,
        dates,
      });
      await newHabit.save();
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Toggle favorite status of a habit
const toggleFavoriteHabits = async (req, res) => {
  const id = req.query.id;
  try {
    const habit = await Habit.findOne({ _id: id, email });
    // Toggle the favorite status of the habit
    habit.favorite = !habit.favorite;
    await habit.save();
    req.flash(
      "success_msg",
      habit.favorite
        ? "Habit added to Favorites!"
        : "Habit removed from Favorites!"
    );
    return res.redirect("back");
  } catch (err) {
    console.log("Toggle favourites error, Try again!");
    res.status(500).send("Internal Server Error");
  }
};

// Update habit status (complete/incomplete/none) for a specific date
const updateHabitStatus = async (req, res) => {
  const d = req.query.date;
  const id = req.query.id;
  try {
    const habit = await Habit.findById(id);
    const dates = habit.dates;
    let found = false;
    dates.forEach((item) => {
      if (item.date === d) {
        // Toggle the habit's status for the given date
        if (item.complete === "yes") {
          item.complete = "no";
        } else if (item.complete === "no") {
          item.complete = "none";
        } else if (item.complete === "none") {
          item.complete = "yes";
        }
        found = true;
      }
    });
    if (!found) {
      // Add a new date with complete status for the habit
      dates.push({ date: d, complete: "yes" });
    }
    habit.dates = dates;
    await habit.save();
    return res.redirect("back");
  } catch (err) {
    console.log("Status updation error, Try again!");
    res.status(500).send("Internal Server Error");
  }
};

// Delete a habit
const deleteHabit = async (req, res) => {
  const id = req.query.id;
  try {
    // Delete the habit by id and associated with the user's email
    await Habit.deleteMany({ _id: id, email });
    req.flash("success_msg", "Habit deleted successfully!");
    return res.redirect("back");
  } catch (err) {
    console.log("Deletion Error, Try again!");
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  renderMainPage,
  renderDashboard,
  toggleUserView,
  addHabit,
  toggleFavoriteHabits,
  updateHabitStatus,
  deleteHabit,
};
