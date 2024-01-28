# Habit Tracker App

The Habit Tracker App is a web application that helps users track their daily habits and maintain a consistent routine.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features

- User Registration and Login
- Dashboard
- Habit Management
- Habit Completion
- Daily and Weekly Views

## Technologies Used

The Habit Tracker App is built using the following technologies:

- Node.js
- Express
- MongoDB
- EJS
- nodemon

## Installation

To run the Habit Tracker App locally, follow these steps:

1. Clone the GitHub repository:
   `git clone https://github.com/Tusharr-Sharma/Habit-Tracker`

2. Navigate to the project directory:
   `cd Habit_Tracker_App`

3. Install the dependencies:
   `npm install`

4. Set up the environment variables:

- Create a `.env` file in the root directory of the project.
- Add the following variables to the `.env` file:
  ```
  PORT=5000
  MONGODB_URI=<your_mongodb_uri>
  ```
  Replace `<your_mongodb_uri>` with your MongoDB connection string.

5. Start the application:
   `npm start`

6. Open your web browser and visit `http://localhost:5000` to access the Habit Tracker App.

## Usage

1. Register a new user account by providing your name and email.
2. Log in to the app using your registered email.
3. On the dashboard, you can view your habits and their completion status for the current day.
4. To add a new habit, enter the habit content in the input field and click the "Add Habit" button.
5. To mark a habit as complete, click the checkbox next to the habit on the dashboard.
6. To switch between daily and weekly views, click the "Switch View" button.
7. To toggle the favorite status of a habit, click the star icon next to the habit.
8. To delete a habit, click the trash can icon next to the habit.
9. To log out of the app, click the "Logout" button.

## License

This project is licensed under the [MIT License](LICENSE).
