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
    }
})

module.exports = new mongoose.model("StudentInfo", studentInfoSchema);