// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
<<<<<<< HEAD
=======
// var exphbs = require("express-handlebars");

var db = require("./models");
>>>>>>> e31f47cb899f01953c29ae5d24fd5133f3cae290

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

<<<<<<< HEAD
// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/addGoal.js")(app);
require("./routes/viewGoals.js")(app);
require("./routes/index.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
=======
// // Handlebars
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main"
//   })
// );
// app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/goal-api-routes")(app);
require("./routes/user-api-routes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
>>>>>>> e31f47cb899f01953c29ae5d24fd5133f3cae290
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

