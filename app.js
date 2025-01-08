const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
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
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// app.get("/", (req, res) => {
//     res.send("Hello from root");
// })

//Index Route
app.get("/listings", async (req, res) => {
    let allListings = await Listing.find();
    res.render("listings/index", { allListings });
})

//Create Route
app.get("/listings/new", async (req, res) => {
    res.render("listings/new");
})

app.post("/listings", async (req, res) => {
    let newListing = await Listing( req.body.listings );
    newListing.save();
    res.redirect("/listings");
})

//Show Route
app.get("/listings/:id", async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/show", {listing});
})

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/edit", {listing});
})

//edit.ejs  R
app.put("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, {...req.body.listings});
    res.redirect(`/listings/${id}`);
})

//Delete Route edit.ejs R
app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})


app.listen(5500, () => {
    console.log("server listening on port 5500");
})
