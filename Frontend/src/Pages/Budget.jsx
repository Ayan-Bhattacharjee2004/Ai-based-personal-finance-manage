// frontend/src/pages/Budget.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Budget = () => {
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingBudgetId, setEditingBudgetId] = useState(null);

  const backendURL = "http://localhost:7500/api";

  useEffect(() => {
    fetchBudgets();
    fetchAccounts();
  }, []);

  const fetchBudgets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${backendURL}/budgets`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Fetched Budgets:", response.data); // 🛑 Debug log
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${backendURL}/accounts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const handleCreateOrUpdateBudget = async () => {
    try {
      const token = localStorage.getItem('token');

      if (editMode) {
        // ✏️ Update existing budget
        await axios.put(`${backendURL}/budgets/${editingBudgetId}`, { amount }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Budget updated successfully!");
      } else {
        // ➕ Create new budget
        await axios.post(`${backendURL}/budgets`, { accountId, amount }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Budget created successfully!");
      }

      // Reset form after action
      setAccountId("");
      setAmount("");
      setEditMode(false);
      setEditingBudgetId(null);
      fetchBudgets(); // Refresh list
    } catch (error) {
      console.error("Error creating/updating budget:", error);
      alert(error.response?.data?.message || "Error occurred");
    }
  };

  const handleEditBudget = (budget) => {
    setEditMode(true);
    setEditingBudgetId(budget._id);
    setAccountId(budget.account._id); // pre-select account
    setAmount(budget.amount);         // pre-fill amount
  };

  const handleDeleteBudget = async (budgetId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${backendURL}/budgets/${budgetId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Budget deleted successfully!");
      fetchBudgets();
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{editMode ? "Edit Budget" : "Create Budget"}</h2>

      <div style={{ marginBottom: "20px" }}>
        <select
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          disabled={editMode} // ❌ can't change account when editing
        >
          <option value="">Select Account</option>
          {accounts.map((acc) => (
            <option key={acc._id} value={acc._id}>
              {acc.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Enter Budget Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <button onClick={handleCreateOrUpdateBudget} style={{ marginLeft: "10px" }}>
          {editMode ? "Update Budget" : "Create Budget"}
        </button>
      </div>

      <h3>Existing Budgets:</h3>

      {budgets.length > 0 ? (
        <ul>
          {budgets.map((budget) => {
            // 🧠 Right now remaining = full amount (no expense subtraction yet)
            const remaining = budget.amount;

            return (
              <li key={budget._id} style={{ marginBottom: "10px" }}>
                <strong>Account:</strong> {budget.account?.name || "Account Not Found"} | 
                <strong> Budget Amount:</strong> ₹{budget.amount} |
                <strong> Remaining:</strong> ₹{remaining}
                <button
                  onClick={() => handleEditBudget(budget)}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBudget(budget._id)}
                  style={{ marginLeft: "5px", color: "red" }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No Budgets Found. Please create one!</p>
      )}
    </div>
  );
};

export default Budget;
