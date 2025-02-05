const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const StudentUserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    phone: String,
    gender: String
});

// Add authentication methods
StudentUserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("StudentUser", StudentUserSchema);
