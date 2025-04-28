// Backend/models/BudgetModel.js
const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true }, // Link to Account
  amount: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User
}, { timestamps: true });

const Budget = mongoose.model("Budget", budgetSchema);
module.exports = Budget;
