
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    linkedinUrl: String,
    languages: {type: String, enum:[String, String]},
    program: String,
    background: String,
    image: String,
    projects: [],
    
});


const Student = mongoose.model("Student", studentSchema);


module.exports = Student;

