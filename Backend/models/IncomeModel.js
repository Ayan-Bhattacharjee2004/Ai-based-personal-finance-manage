const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    account: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Income = mongoose.model("Income", incomeSchema);
module.exports = Income;
