const express = require('express')
const budget = require('../controllers/budget')
const { authorize, Roles } = require('../middleware/auth')
const router = express.Router()   

router.get('/userBudgetList/:id',authorize(Roles.All),budget.getUserBudget)
router.post('/createNewCategory/:id',authorize(Roles.All),budget.createUserBudgetCategory)
router.post('/createNewCategoryExpenses/:id/:categoryId',authorize(Roles.All),budget.createUserBudgetExpense)
router.put('/updateCategoryExpenses/:id/:categoryId/:expensesId',authorize(Roles.All),budget.updateUserBudgetExpense)
router.delete('/deleteCategoryExpenses/:id/:expensesId',authorize(Roles.All),budget.deleteBudgetExpenses)

module.exports = router  
