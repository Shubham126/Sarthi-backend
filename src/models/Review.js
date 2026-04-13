const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  review: String,
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);