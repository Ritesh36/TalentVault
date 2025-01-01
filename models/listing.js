const mongoose = require("mongoose");

const listingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLength: 10
    },
    requirements: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = new mongoose.model('Listing', listingSchema);