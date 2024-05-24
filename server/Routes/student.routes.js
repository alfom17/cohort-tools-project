const router = require("express").Router()
const Student = require("../models/students_model")



//STUDENTS


// OK-------------------------------
router.post("/", (req, res, next) => {
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
        res.status(201).json({ message: "student creado" });
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  });
  
  
  // OK-------------------------------------
  router.get("/", async (req, res, next) => {
    try {
      const response = await Student.find()
      console.log(response);
      res.status(200).json(response)
    } catch (error) {
      next(error);
    }
  });
  
  
  
  
  // OK--------------------------------
  router.get("/cohorts/:cohortId", async (req, res, next) => {
    console.log("recupera estudiante");
    console.log(req.params);
    try {
      const response = await Student.find({cohort:req.params.cohortId})
      res.status(200).json(response)
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  
  // OK--------------------------
  router.get("/:studentId", async (req, res, next) => {
    console.log("recupera estudiante");
    console.log(req.params);
    try {
      const response = await Student.findById(req.params.studentId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  
  // OK----------------------------
  router.put("/:studentId", async (req, res) => {
    try {
      const response=
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
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
     next(error);
    }
  });
  // OK---------------------------------------
  router.delete("/:studentId", async (req, res, next) => {
    try {
      const response=
      await Student.findByIdAndDelete(req.params.studentId);
      res.status(202).json(response)
    } catch (error) {
      console.log(error);
      next(error);
    }
  });




module.exports = router