const router = require ("express").Router()
const Cohort = require("../models/cohorts_model")


//COHORT


// OK-------------------
router.post("/", (req, res, next) => {
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
      /*console.log("cohort creado");*/
      res.status(201).json({ message: "cohort creado" });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

//OK------------------------
router.get("/", async (req, res, next) => {
  try {
    const response = await Cohort.find();
    res.status(200).json(response);
  } catch (error) {
    console.log("error");
    next(error);
  }
});

//OK--------------------------
router.get("/:cohortId", async (req, res, next) => {
  console.log("recupera cohorts");
  console.log(req.params);
  try {
    const response = await Cohort.findById(req.params.cohortId);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//OK-----------------------
router.put("/:cohortId", async (req, res, next) => {
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
    res.status(200).json({message:"cohort actualizado"})
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//OK--------------------
router.delete("/:cohortId", async (req, res, next) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.sendStatus(202).json({message:"cohort borrado"})
  } catch (error) {
    console.log(error);
    next(error);
  }
});




module.exports = router




