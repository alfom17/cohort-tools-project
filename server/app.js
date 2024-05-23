require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const PORT = 5005;

const cohorts = require("./cohorts.json");
const students = require("./students.json");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-project")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const Student = require("./models/students_model");

//STUDENTS

/*app.get("/student", (req, res) => {
  Student.find({})
    .then((student) => {
      res.json(student);
    })
    .catch((error) => {
      console.error("Error while retrieving student ->", error);
      res.status(500).json({ error: "Failed to retrieve student" });
    });
});*/

app.post("/api/students", (req, res, next) => {
  console.log(req.body);

  Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    projects: req.body.projects,
  })
    .then(() => {
      console.log("student creado");
      res.json({ message: "student creado" });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

app.get("/api/students", async (req, res, next) => {
  try {
    const response = await Student.find()
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});
//--------------------------------------------------------------------
/*app.get("/api/students/cohorts/:cohortId", async (req, res, next) => {
  console.log("recupera estudiante");
  console.log(req.params);
  try {
    const response = await Student.findById(Cohort.findById(req.params.cohortId)).populate("cohortId");
    res.json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});*/

app.get("/api/students/cohorts/:cohortId", async (req, res, next) => {
  console.log("recupera estudiante");
  console.log(req.params);
  try {
    const students = await Student.find({ cohort: req.params.cohortId }).populate('cohort');
    res.json(students);
  } catch (error) {
    console.log(error);
    next(error)
  }

  });
  

//--------------------------------------------------------------------
app.get("/api/students/:studentId", async (req, res, next) => {
  console.log("recupera estudiante");
  console.log(req.params);
  try {
    const response = await Student.findById(req.params.studentId);
    res.json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.put("/api/students/:studentId", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.studentId, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages,
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      projects: req.body.projects,
    });
    res.json("student editado");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.delete("/api/students/:studentId", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId);
    res.json("student borrado");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//COHORT
const Cohort = require("./models/cohorts_model");

app.post("/api/cohorts", (req, res) => {
  console.log(req.body);

  Cohort.create({
    inProgress: req.body.inProgress,
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
  })
    .then(() => {
      console.log("cohort creado");
      res.json({ message: "cohort creado" });
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    });
});

app.get("/api/cohorts", async (req, res) => {
  try {
    const response = await Cohort.find();
    res.json(response);
  } catch (error) {
    console.log("error");
    res.json(error);
  }
});

app.get("/api/cohorts/:cohortId", async (req, res) => {
  console.log("recupera cohorts");
  console.log(req.params);
  try {
    const response = await Cohort.findById(req.params.cohortId);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.put("/api/cohorts/:cohortId", async (req, res) => {
  console.log(req.body);
  try {
    await Cohort.findByIdAndUpdate(req.params.cohortId, {
      inProgress: req.body.inProgress,
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours,
    });
    res.json("cohort editado");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.delete("/api/cohorts/:cohortId", async (req, res,) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.json("cohort borrado");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//------GESTOR DE ERRORES

app.use((req, res) => {
  res.status(404).json({ errorMessage: "ruta no encontrada" });
});

app.use((err, req, res, next) => {
  res.status(500).json({errorMessage: "problemas con el servidor inentelo más tarde"});
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
