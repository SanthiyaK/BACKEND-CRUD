const express = require('express');
const router = express.Router();
const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');

// GET all expenses
router.get('/expenses', getExpenses);

// POST a new expense
router.post('/expenses', createExpense);

// PUT (update) an expense
router.put('/expenses/:id', updateExpense);

// DELETE an expense
router.delete('/expenses/:id', deleteExpense);

module.exports = router;
