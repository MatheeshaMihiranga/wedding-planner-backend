const mongoose = require("mongoose");
const schema = mongoose.Schema;

const supplierModel = new schema({
  supplierName: {
    type: String,
    require: true,
    default: "",
  },
  location: {
    type: String,
    require: false,
    default: "",
  },
  description: {
    type: String,
    require: false,
    default: "",
  },
  categoryType: {
    type: String,
    require: false,
    default: "",
  },
  webLink: {
    type: String,
    require: false,
    default: "",
  },
  packageId: {
    type: String,
    require: false,
    ref: "Packages",
  },
  reviewId: {
    type: String,
    require: false,
    ref: "Reviews",
  },
  userId: {
    type: String,
    ref: "Users",
  },
  enquireId: {
    type: String,
    ref: "Enquires",
  },
  rating: {
    type: Number,
    require: false,
    default: 0,
  },
  images: {
    type: Array,
    require: false,
    default: [],
  },
  unavailableDates: {
    type: Array,
    require: false,
    default: [],
  },
  status: {
    type: Boolean,
    require: false,
    default: true,
  },
});

module.exports = mongoose.model("Suppliers", supplierModel);
