const Expense = require("../models/ExpenceModel");
const Account = require("../models/AccountModel");

const createExpense = async (req, res) => {
  try {
    const { amount, account, category, date, description, isNewAccount, initialBalance } = req.body;
    let accountDoc;

    if (isNewAccount) {
      accountDoc = new Account({
        name: account,
        balance: Number(initialBalance) - Number(amount),
      });
      await accountDoc.save();
    } else {
      accountDoc = await Account.findOne({ name: account });
      if (!accountDoc) return res.status(404).json({ error: "Account not found" });
      accountDoc.balance -= Number(amount);
      await accountDoc.save();
    }

    const newExpense = new Expense({
      amount,
      account,
      category,
      date,
      description,
      userId: req.user, // ✅ Add logged in user id
    });

    await newExpense.save();

    res.status(201).json({ message: "Expense added and account balance updated", expense: newExpense });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user }); // ✅ Fetch only logged-in user's expenses
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createExpense, getAllExpenses, deleteExpense, updateExpense };
