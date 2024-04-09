const mongoose = require("mongoose");
const schema = mongoose.Schema;

const reviewDetailsModel = new schema({
  userId: {
    type: String,
    require: true,
    default: "",
  },
  userName: {
    type: String,
    require: false,
    default: "",
  },
  userReview: {
    type: String,
    require: false,
    default: null,
  },
  supplierReview: {
    type: String,
    require: false,
    default: null,
  },
  reviewCount: {
    type: Number,
    require: false,
    default: 0,
  },
});

const reviewsModel = new schema({
  supplierId: {
    type: String,
    ref: "Suppliers",
  },
  reviews: [reviewDetailsModel],
});

module.exports = mongoose.model("Reviews", reviewsModel);