const router = require("express").Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {isTokenValid} = require("../middlewares/auth.middleware")
const User = require("../models/user_model")



//Encontrar un usuario por su id 
router.get("/:id", isTokenValid,(req, res) => {
res.status(200).json({payload: req.payload})
console.log("patata");
})











module.exports = router;