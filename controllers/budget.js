const { categoryList } = require("../config/categoryList");
const budgetModel = require("../models/budget");
const { ObjectId } = require("mongodb");

exports.registerBudget = async (user) => {
  try {
    const budget = new budgetModel({
      userId: user?._id || "",
      category: categoryList,
    });
    return budget.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getUserBudget = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userBudgetData = await budgetModel.findOne({ userId: userId });
    return res.json({
      success: true,
      data: userBudgetData,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.createUserBudgetCategory = async (req, res, next) => {
  try {
    const checkListId = req.params.id;
    let getBudgetDetails = await budgetModel.findById(checkListId);
    getBudgetDetails.category.push(req.body);
    const getBudgetData = await getBudgetDetails.save();
    return res.json({
      success: true,
      data: getBudgetData,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.createUserBudgetExpense = async (req, res, next) => {
  try {
    const parentId = req.params.id;
    const categoryId = req.params.categoryId;
    let getBudgetDetails = await budgetModel.findById(parentId);
    const objectIndex = getBudgetDetails.category.findIndex(
      (obj) => obj._id.toString() === categoryId
    );
    getBudgetDetails.category[objectIndex].expenses.push(req.body);
    const getBudgetData = await getBudgetDetails.save();
    return res.json({
      success: true,
      data: getBudgetData,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.updateUserBudgetExpense = async (req, res, next) => {
  try {
    const parentId = req.params.id;
    const categoryId = req.params.categoryId;
    const expensesId = req.params.expensesId;
    let getBudgetDetails = await budgetModel.findById(parentId);
    const objectIndex = getBudgetDetails.category.findIndex(
      (obj) => obj._id.toString() === categoryId
    );
    const getCategoryExpensesData =
      getBudgetDetails.category[objectIndex].expenses;
    const objectIndexInExpenses = getCategoryExpensesData.findIndex(
      (obj) => obj._id.toString() === expensesId
    );
    getBudgetDetails.category[objectIndex].expenses[objectIndexInExpenses].set(
      req.body
    );
    const getBudgetData = await getBudgetDetails.save();
    return res.json({
      success: true,
      data: getBudgetData,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.deleteBudgetExpenses = async (req, res, next) => {
  try {
    const parentId = req.params.id;
    const expensesId = req.params.expensesId;

    const dataView = await budgetModel.findOneAndUpdate(
      { _id: parentId }, // Query to find the document
      { $pull: { "category.$[outer].expenses": { _id: expensesId } } }, // Update using $pull to remove the expense
      {
        arrayFilters: [{ "outer.expenses._id": expensesId }], // Filter to specify which expense to remove
        new: true, // To return the updated document
      }
    );
    return res.json({
      success: true,
      data: dataView,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};
