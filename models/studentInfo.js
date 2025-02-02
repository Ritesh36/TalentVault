const mongoose = require("mongoose");

const studentInfoSchema = mongoose.Schema({
    about: {
        type: String,
        minLength: 10
    },
    certifications: {
        type: String
    },
    experience: {
        type: String
    },
    education: {
        subSummary: {
            Qualification: {
                type: String,
                required: true
            },
            Course: {
                type: String,
                required: true
            },
            
        }
    },
    projects: {
        type: String
    },
    achievements: {
        type: String
    },
    skills: {
        type: String
    },
    linkedin:{
        type: String
    },
    github:{
        type: String
    },
    instagram:{
        type: String
    },
    profilePic:{
        type: String
    },
    resume:{
        type: String
    },
    Student_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student_user",
        required: true
    },
})

module.exports = new mongoose.model("StudentInfo", studentInfoSchema);