const mongoose = require("mongoose");
const budget = require("./budget");
const schema = mongoose.Schema;

const userModal = new schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: false,
  },
  location: {
    type: String,
    require: false,
  },
  eventDate: {
    type: String,
    require: false,
  },
  budget: {
    type: Number,
    require: false,
  },
  location: {
    type: String,
    require: false,
  },
  supplierId: {
    type: String,
    require: false,
    ref: "Suppliers",
  },
  checkListId: {
    type: String,
    require: false,
    ref: "CheckList",
  },
  budgetId: {
    type: String,
    require: false,
    ref: "Budget",
  },
  guestId: {
    type: String,
    require: false,
    ref: "Guests",
  },
  role: {
    type: String,
    require: true,
  },
  resetPasswordToken: String,
  resetPasswordDate: Date,
});

module.exports = mongoose.model("Users", userModal);
