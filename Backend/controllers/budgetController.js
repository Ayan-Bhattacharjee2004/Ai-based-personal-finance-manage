// Backend/controllers/BudgetController.js
const Budget = require("../models/Budget");

const createBudget = async (req, res) => {
  try {
    const { accountId, amount } = req.body;
    const userId = req.user;

    // 🛑 Check if a budget already exists for this account and user
    const existingBudget = await Budget.findOne({ account: accountId, user: userId });

    if (existingBudget) {
      return res.status(400).json({ message: "Budget for this account already exists!" });
    }

    // ✅ Create new budget if no existing one
    const budget = new Budget({
      account: accountId,
      amount,
      user: userId,
    });

    await budget.save();

    res.status(201).json({ message: "Budget created successfully", budget });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getBudgets = async (req, res) => {
  try {
    const userId = req.user;
    const budgets = await Budget.find({ user: userId }).populate('account'); // populate account details
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBudget = async (req, res) => {
  try {
    const budgetId = req.params.id;
    const { amount } = req.body;

    const budget = await Budget.findById(budgetId);
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    budget.amount = amount;
    await budget.save();

    res.status(200).json({ message: "Budget updated successfully", budget });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBudget = async (req, res) => {
  try {
    const budgetId = req.params.id;
    await Budget.findByIdAndDelete(budgetId);
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBudget, getBudgets, updateBudget, deleteBudget };
