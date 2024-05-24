const router = require ("express").Router()

router.get("/", (req, res, next) => {
    res.json({ message: "all good here!" })
  })
const studentRouter = require("./student.routes")
router.use("/students", studentRouter)

const cohortRouter = require("./cohort.routes")
router.use("/cohorts", cohortRouter)

module.exports = router