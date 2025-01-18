const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const Listing = require("./models/listing");
const StudentInfo = require("./models/studentInfo");
const User = require("./models/user");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
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



//Index Route R
app.get("/listings", wrapAsync(async (req, res) => {
    let allListings = await Listing.find();
    res.render("listings/index", { allListings });
}));


//Create Route R
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
})

app.post("/listings", wrapAsync(async (req, res) => {
    let newListing = await Listing(req.body.listings );
    if(!req.body.listings){
        throw new ExpressError(400, "Invalid Listing Data");
    }
    newListing.save();
    res.redirect("/listings");
}));


//Show Route R
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
}));


//Edit Route R
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/edit", { listing });
}));

app.put("/listings/:id", wrapAsync(async (req, res) => {
    let {id} = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, {...req.body.listings});
    res.redirect(`/listings/${id}`);
}));


//Delete Route  R
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));


//comapny name S
app.get('/api/companies', (req, res) => {
    const query = req.query.query.toLowerCase();
    const companies = ['Google', 'Microsoft', 'Apple', 'Amazon', 'Facebook'];
    const results = companies.filter(company => company.toLowerCase().includes(query));
    res.json(results);
});


// Catch-all route for undefined routes
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
})


//Error Handling Middleware  R
app.use((err, req, res, next) => {
    const {statusCode=500, message="Something went wrong"} = err;
    res.render("error", {message});
})


app.listen(5500, () => {
    console.log("server listening on port 5500");
})
