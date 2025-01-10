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
    logo: {
        type: String,
        default: "https://default.logo.url/path/to/default/logo.png",
        validate: {
            validator: function(value) {
                const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
                return urlRegex.test(value);
            },
            message: 'Invalid URL format for logo.'
        }
    },
    company: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        default: "Not specified"
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Listing', listingSchema);
