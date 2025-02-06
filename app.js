const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");

const Listing = require("./models/listing");
const StudentUser = require("./models/student_user");
const EmployeeUser = require("./models/employee_user");

const MONGO_URL = "mongodb://127.0.0.1:27017/TalentVault";

// Database 
mongoose.connect(MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("DB Connection Error:", err));

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Session 
app.use(session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: true
}));

// Passport Authentication
app.use(passport.initialize());
app.use(passport.session());

// Fix: Properly use LocalStrategy with authenticate() methods
passport.use("student", new LocalStrategy({
    usernameField: "email" 
}, StudentUser.authenticate()));

passport.use("employee", new LocalStrategy({
    usernameField: "email" // Specify custom username field for login
}, EmployeeUser.authenticate()));

// Passport Serialization and Deserialization
passport.serializeUser((user, done) => {
    done(null, { id: user.id, type: user instanceof StudentUser ? "student" : "employee" });
});

passport.deserializeUser(async (data, done) => {
    const Model = data.type === "student" ? StudentUser : EmployeeUser;
    try {
        const user = await Model.findById(data.id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Middleware for Flash Messages
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// Home Route
app.get("/", (req, res) => res.send("Welcome to TalentVault!"));

// Listings Routes
app.get("/listings", wrapAsync(async (req, res) => {
    let allListings = await Listing.find();
    res.render("listings/index", { allListings });
}));

app.get("/listings/new", (req, res) => res.render("listings/new"));

app.post("/listings", wrapAsync(async (req, res) => {
    if (!req.body.listings) throw new ExpressError(400, "Invalid Listing Data");
    let newListing = new Listing(req.body.listings);
    await newListing.save();
    res.redirect("/listings");
}));

app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing not found");
    res.render("listings/show", { listing });
}));

app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/edit", { listing });
}));

app.put("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listings });
    res.redirect(`/listings/${id}`);
}));

app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

// Signup Route
app.get("/signup", (req, res) => res.render("users/signup"));

app.post("/signup", wrapAsync(async (req, res) => {
    const { first_name, last_name, email, phone, password, confirm_password, gender, userType } = req.body;

    if (password !== confirm_password) throw new ExpressError(400, "Passwords do not match");

    const UserModel = userType === "candidate" ? StudentUser : EmployeeUser;

    const newUser = new UserModel({
        first_name, last_name, email, phone, gender
    });

    await UserModel.register(newUser, password);
    res.redirect("/listings");
}));

// Login Route
app.get("/login", (req, res) => res.render("users/login"));

app.post("/login", passport.authenticate(["student", "employee"], {
    failureRedirect: "/login",
    failureFlash: true
}), (req, res) => {
    res.redirect("/listings");
});

// Logout Route
app.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("/login");
    });
});

// Company Name API
app.get('/api/companies', (req, res) => {
    const query = req.query.query.toLowerCase();
    const companies = ['Google', 'Microsoft', 'Apple', 'Amazon', 'Facebook'];
    const results = companies.filter(company => company.toLowerCase().includes(query));
    res.json(results);
});

// Catch-All Route for Undefined Routes
app.all("*", (req, res, next) => next(new ExpressError(404, "Page Not Found")));

// Error Handling Middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error", { message });
});

// Start Server
app.listen(5500, () => console.log("Server running on port 5500"));
