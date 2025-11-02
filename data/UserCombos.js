// מערך משתמשים לטסטים מונחי דאטה (Data-Driven Tests)
import { users } from "./Users.js";

// משתמשים תקינים - לטסטים חיוביים
export const validUsers = [
  { name: "standard_user", credentials: users.validUser },
  { name: "problem_user", credentials: users.problemUser },
  { name: "performance_glitch_user", credentials: users.performanceUser },
  { name: "error_user", credentials: users.errorUser },
  { name: "visual_user", credentials: users.visualUser },
];

// תרחישי התחברות כושלים - לטסטים שליליים
export const invalidLoginScenarios = [
  {
    name: "locked_out_user",
    username: users.lockedUser.username,
    password: users.lockedUser.password,
    expectedError: "Epic sadface: Sorry, this user has been locked out",
  },
  {
    name: "correct username + wrong password",
    username: users.validUser.username,
    password: users.wrongPassword,
    expectedError: "Epic sadface: Username and password do not match",
  },
  {
    name: "wrong username + correct password",
    username: users.wrongUsername,
    password: users.validUser.password,
    expectedError: "Epic sadface: Username and password do not match",
  },
  {
    name: "wrong username + wrong password",
    username: users.wrongUsername,
    password: users.wrongPassword,
    expectedError: "Epic sadface: Username and password do not match",
  },
  {
    name: "empty username + correct password",
    username: users.emptyString,
    password: users.validUser.password,
    expectedError: "Epic sadface: Username is required",
  },
  {
    name: "correct username + empty password",
    username: users.validUser.username,
    password: users.emptyString,
    expectedError: "Epic sadface: Password is required",
  },
  {
    name: "empty username + empty password",
    username: users.emptyString,
    password: users.emptyString,
    expectedError: "Epic sadface: Username is required",
  },
];