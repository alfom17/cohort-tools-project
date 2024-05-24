require("dotenv").config();
const cors = require("cors")
const express = require("express")
const cookieParser = require("cookie-parser");
const morgan = require("morgan");


function config(app) {

    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.static("public"));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());




}


module.exports = config
