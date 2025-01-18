const mongoose = require("mongoose");

const listingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: [String],  
        required: true,
        validate: {
            validator: function(value) {
                return value.length > 0;
            },
            message: 'At least one requirement is required.'
        },
    },
    logo: {
        type: String,
        default: "/images/building.png",
        validate: {
            validator: function(value) {
                const urlRegex = /^(ftp|http|https):\/\/[^ "\n]+$/;
                return urlRegex.test(value);
            },
            message: 'Invalid URL format for logo.'
        }
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true,
        enum: ['Full-Time', 'Part-Time', 'Internship', 'Contract']
    },
    requirements: {
        type: [String],  
        required: true,
        validate: {
            validator: function(value) {
                return value.length > 0;
            },
            message: 'At least one requirement is required.'
        }
    },
    salary: {
        type: String,
        default: "Not specified"
    },
    eligibility: {
        type: [String],
        required: true,
        validate: {
            validator: function(value) {
                return value.length > 0;
            },
            message: 'At least one eligibility is required'
        }
    },
    deadline: {
        type: Date,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Listing', listingSchema);
