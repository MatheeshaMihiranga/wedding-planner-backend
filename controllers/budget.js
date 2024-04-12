const { categoryList } = require("../config/categoryList");
const budgetModel = require("../models/budget");

exports.registerBudget = async (user) => {
  try {
    const budget = new budgetModel({
      userId: user?._id || "",
      category: categoryList
    });
    return budget.save();
  } catch (error) {
    throw new Error(error.message);
  }
};
