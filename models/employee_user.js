const moongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const employeeUserSchema = moongoose.Schema({
    frist_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    org_email: {
        type: String,
        required: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    confirm_password:{
        type: String,
        required: true
    },
    phone_no: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

employeeUserSchema.plugin(passportLocalMongoose);

module.exports = new moongoose.model("EmployeeUser", employeeUserSchema);