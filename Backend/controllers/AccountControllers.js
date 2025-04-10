const Account = require("../models/AccountModel");

const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAccount = async (req, res) => {
  try {
    const { name, balance } = req.body;
    const newAcc = new Account({ name, balance });
    await newAcc.save();
    res.status(201).json(newAcc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAccounts,
  createAccount,
};
