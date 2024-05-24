require("dotenv").config();
const express = require("express");
/*const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
//const cookieParser = require("cookie-parser");*/
/*const cohorts = require("./cohorts.json");
const students = require("./students.json");*/
const app = express();
require("./db")
// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
// MIDDLEWARE
// Research Team - Set up CORS middleware here:
const config = require("./config");
config(app);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
const indexRouter = require("./Routes/index.routes");
app.use("/api", indexRouter);

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//const Student = require("./models/students_model")
//const Cohort = require("./models/cohorts_model");

//------GESTOR DE ERRORES

const errorHandlers = require("./error-handlers");
errorHandlers(app);

// START SERVER
const PORT = 5005;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
