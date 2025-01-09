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
    // image: {
    //     type: String,
    //     set: (v) => v === "" ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.creativefabrica.com%2Fproduct%2Farchitecture-building-company-icon%2F&psig=AOvVaw3rqLkJQCUlNocf80AxqiOc&ust=1736517666899000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKjxutLm6IoDFQAAAAAdAAAAABAE" : v,
    //     default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.creativefabrica.com%2Fproduct%2Farchitecture-building-company-icon%2F&psig=AOvVaw3rqLkJQCUlNocf80AxqiOc&ust=1736517666899000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKjxutLm6IoDFQAAAAAdAAAAABAE"
    // },
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