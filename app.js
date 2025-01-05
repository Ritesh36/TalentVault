const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing");
const StudentInfo = require("./models/studentInfo");
const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/TalentVault";

async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then((res) => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello from root");
})

app.get("/index", async (req, res) => {
    let allListings = await Listing.find();
    res.render("listings/index", { allListings });
})

app.listen(5500, () => {
    console.log("server listening on port 5500");
})
