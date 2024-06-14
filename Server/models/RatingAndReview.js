const mongoose = require("mongoose");

const ratingAndReview = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
        index: true,
    },
    rating:{
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model("RatingAndReview", ratingAndReview);