import React, { useState, useEffect } from "react";
import "./ExpenseForm.css"; // You can create a separate CSS file for expense form styles
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

const ExpenseForm = ({ onSubmit, editingData, onCancel }) => {
  const [accounts, setAccounts] = useState([]);
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState("");
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountBalance, setNewAccountBalance] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get("http://localhost:7500/api/accounts");
        // Store full account objects, not just names
        setAccounts([...res.data, { name: "Create ac" }]);
      } catch (err) {
        console.error("Failed to fetch accounts:", err);
      }
    };
    fetchAccounts();
  }, []);

  const handleAccountChange = (e) => {
    const selected = e.target.value;
    if (selected === "Create ac") {
      setShowCreateAccount(true);
    } else {
      setAccount(selected);
    }
  };

  const handleAddNewAccount = async () => {
    const trimmedName = newAccountName.trim();
    const balance = parseFloat(newAccountBalance);
    if (!trimmedName || isNaN(balance)) return;

    try {
      const response = await axios.post("http://localhost:7500/api/accounts", {
        name: trimmedName,
        balance,
      });
      
      // Add the new account to the accounts list
      const newAccount = response.data;
      setAccounts([...accounts.filter(acc => acc.name !== "Create ac"), newAccount, { name: "Create ac" }]);
      setAccount(trimmedName);
      setNewAccountName("");
      setNewAccountBalance("");
      setShowCreateAccount(false);
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  useEffect(() => {
    if (editingData) {
      setAmount(editingData.amount);
      setAccount(editingData.account);
      setCategory(editingData.category);
      setDate(editingData.date ? dayjs(editingData.date) : null);
      setDescription(editingData.description);
    } else {
      setAmount("");
      setAccount("");
      setCategory("");
      setDate(null);
      setDescription("");
    }
  }, [editingData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: editingData?._id || editingData?.id,
      amount,
      account,
      category,
      date: date ? date.format("YYYY-MM-DD") : null,
      description,
      isNewAccount: showCreateAccount,
      initialBalance: newAccountBalance || 0,
    };

    // Just pass the data to parent component which will handle the API call
    onSubmit(data);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="transaction-form-container">
      {/* Create Account Modal/Popup */}
      {showCreateAccount && (
        <div className="account-modal-overlay">
          <div className="account-modal">
            <h2>Create New Account</h2>
            <div className="modal-form">
              <label className="L1">Account Name</label>
              <input
                type="text"
                value={newAccountName}
                onChange={(e) => setNewAccountName(e.target.value)}
                placeholder="Account Name"
              />
              <label className="L1">Current Balance</label>
              <input
                type="number"
                value={newAccountBalance}
                onChange={(e) => setNewAccountBalance(e.target.value)}
                placeholder="0.00"
              />
              <div className="form-buttons">
                <button
                  className="create-btn"
                  onClick={handleAddNewAccount}
                  disabled={!newAccountName.trim() || !newAccountBalance}
                >
                  Save Account
                </button>
                <button className="cancel-btn" onClick={() => setShowCreateAccount(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Expense Form */}
      <h1>{editingData ? "Edit Expense" : "Add Expense"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-group">
            <label>Account</label>
            <select value={account} onChange={handleAccountChange} required>
              <option value="">-- Select Account --</option>
              {accounts.map((acc, i) => (
                <option key={i} value={acc.name}>
                  {acc.name === "Create ac" 
                    ? "Create new account" 
                    : `${acc.name} (Balance: ${formatCurrency(acc.balance)})`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">-- Select Category --</option>
          <option value="Utilities">Utilities</option>
          <option value="Rent">Rent</option>
          <option value="Groceries">Groceries</option>
          <option value="Transport">Transport</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Education">Education</option>
          <option value="Loans">Loans</option>
          <option value="Insurance">Insurance</option>
          <option value="Other">Other</option>
        </select>

        <label>Date</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="mui-datepicker-container">
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Select Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                format="YYYY-MM-DD"
              />
            </DemoContainer>
          </div>
        </LocalizationProvider>

        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
        />

        <div className="form-buttons">
          <button type="submit" className="create-btn">
            {editingData ? "Update Expense" : "Add Expense"}
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;