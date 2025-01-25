const mongoose = require("mongoose");

const studentInfoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    clgName: {
        type: String,
        required: true
    },
    about: {
        type: String,
        minLength: 10
    },
    mobileNo: {
        type: Number,
        required: true,
        min: 10
    },
    certifications: {
        type: String
    },
    experience: {
        type: String
    },
    education: {
        type: String,
        required: true
    },
    projects: {
        type: String
    },
    achievements: {
        type: String
    },
    gmail:{
        type: String,
        required: true
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = new mongoose.model("StudentInfo", studentInfoSchema);