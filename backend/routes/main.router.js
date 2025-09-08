const express = require("express");
const userRouter = require("./user.router");
// Importing the userRouter to handle user-related routes
// This allows the mainRouter to delegate user-related requests to the userRouter, which contains specific
const repRouter = require("./repo.router");
const issueRouter = require("./issue.router");


// Importing the repoRouter to handle repository-related routes

const mainRouter = express.Router();

mainRouter.use(userRouter); // Mounting the userRouter on the "/users" path
mainRouter.use(repRouter); // Mounting the repoRouter on the "/repos" path
mainRouter.use(issueRouter); // Mounting the issueRouter on the "/issues" path

mainRouter.get("/", (req, res) => {
  res.send("Welcome to the Github Clone API!");
});


module.exports = mainRouter;// Exporting the mainRouter to be used in the server setup
// This allows the mainRouter to be imported in the server file (index.js) and used as middleware for handling requests to the root path ("/") of the API.
// The mainRouter can be extended with more routes and functionalities as needed for the application.