const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  userName: {
    type: String,
    ref: "userName",
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    ref: "rating",
    min: 1,
    max: 5,
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SupplierId",
    required: false,
  },
  vendorFeedback: {
    type: String,
    ref: "VendorFeedback",
    required: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);