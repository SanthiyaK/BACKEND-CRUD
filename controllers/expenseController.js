const Expense = require('../models/Expense');

// GET all expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// CREATE a new expense
const createExpense = async (req, res) => {
  const { title, amount } = req.body;
  if (!title || !amount) {
    return res.status(400).json({ message: 'Title and amount are required' });
  }

  try {
    const newExpense = new Expense({ title, amount });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: 'Error creating expense' });
  }
};

// UPDATE an expense
const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;

  try {
    const updated = await Expense.findByIdAndUpdate(
      id,
      { title, amount },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense' });
  }
};

// DELETE an expense
const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Expense.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense' });
  }
};

module.exports = {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};
