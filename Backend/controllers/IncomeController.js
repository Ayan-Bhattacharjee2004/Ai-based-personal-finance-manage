const Income = require("../models/IncomeModel");
const Account = require("../models/AccountModel");

const createIncome = async (req, res) => {
  try {
    const { amount, account, category, date, description, isNewAccount, initialBalance } = req.body;
    let accountDoc;

    if (isNewAccount) {
      accountDoc = new Account({
        name: account,
        balance: Number(initialBalance) + Number(amount),
      });
      await accountDoc.save();
    } else {
      accountDoc = await Account.findOne({ name: account });
      if (!accountDoc) return res.status(404).json({ error: "Account not found" });
      accountDoc.balance += Number(amount);
      await accountDoc.save();
    }

    const newIncome = new Income({
      amount,
      account,
      category,
      date,
      description,
      userId: req.user, // ✅ Add logged in user id
    });

    await newIncome.save();

    res.status(201).json({ message: "Income added and account balance updated", income: newIncome });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Backend/controllers/IncomeController.js - Updated getAllIncomes function

const getAllIncomes = async (req, res) => {
  try {
    const userId = req.user;
    let query = { userId };
    
    // Check if month and year parameters are provided
    if (req.query.month && req.query.year) {
      const month = parseInt(req.query.month) - 1; // JavaScript months are 0-11
      const year = parseInt(req.query.year);
      
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0); // Last day of the month
      
      // Add date range filter to the query
      query.date = {
        $gte: startDate,
        $lte: endDate
      };
    }
    
    const incomes = await Income.find(query);
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Backend/controllers/ExpenseController.js - Updated getAllExpenses function

const getAllExpenses = async (req, res) => {
  try {
    const userId = req.user;
    let query = { userId };
    
    // Check if month and year parameters are provided
    if (req.query.month && req.query.year) {
      const month = parseInt(req.query.month) - 1; // JavaScript months are 0-11
      const year = parseInt(req.query.year);
      
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0); // Last day of the month
      
      // Add date range filter to the query
      query.date = {
        $gte: startDate,
        $lte: endDate
      };
    }
    
    const expenses = await Expense.find(query);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(income);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createIncome, getAllIncomes, deleteIncome, updateIncome };
