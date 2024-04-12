const mongoose = require("mongoose");
const schema = mongoose.Schema;

const expensesDetailsModel = new schema({
  description: {
    type: String,
    require: false,
    default: "",
  },
  cost: {
    type: Number,
    require: false,
    default: "",
  },
  notes: {
    type: String,
    require: false,
    default: "",
  },
});

const categoryDetailsModel = new schema({
  categoryName: {
    type: String,
    require: true,
    default: "",
  },
  expenses:[expensesDetailsModel]
});

const budgetModel = new schema({
  userId: {
    type: String,
    ref: "Users",
  },
  category: [categoryDetailsModel],
});

module.exports = mongoose.model("Budget", budgetModel);