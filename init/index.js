const mongoose = require("mongoose");
const initListingData = require("./data.listing.js");
const initStudentInfoData = require("./data.studentInfo.js");
const Listing = require("../models/listing.js");
const StudentInfo = require("../models/studentInfo.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/TalentVault";

async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then((res) => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
});

const initData = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initListingData.data);
    console.log("Data is initalized");
}

// initData();

const initInfoData = async () => {
    await StudentInfo.deleteMany({});
    await StudentInfo.insertMany(initStudentInfoData.data);
    console.log("StudentInfo data is intialized");
}

initInfoData();