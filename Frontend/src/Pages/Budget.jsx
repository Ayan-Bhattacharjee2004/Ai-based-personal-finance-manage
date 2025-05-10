import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, DollarSign, CreditCard, AlertCircle, CheckCircle, BarChart2 } from "lucide-react";
import "./Budget.css"
const Budget = () => {
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingBudgetId, setEditingBudgetId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const backendURL = "http://localhost:7500/api";

  useEffect(() => {
    fetchBudgets();
    fetchAccounts();
    fetchExpenses();
  }, []);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${backendURL}/budgets`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setBudgets(data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
      showNotification("Failed to load budgets", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${backendURL}/accounts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setAccounts(data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      showNotification("Failed to load accounts", "error");
    }
  };

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${backendURL}/expenses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      showNotification("Failed to load expenses", "error");
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateOrUpdateBudget = async () => {
    try {
      const token = localStorage.getItem('token');

      if (editMode) {
        await fetch(`${backendURL}/budgets/${editingBudgetId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ amount })
        });
        showNotification("Budget updated successfully!");
      } else {
        await fetch(`${backendURL}/budgets`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ accountId, amount })
        });
        showNotification("Budget created successfully!");
      }

      // Reset form after action
      setAccountId("");
      setAmount("");
      setEditMode(false);
      setEditingBudgetId(null);
      fetchBudgets(); // Refresh list
    } catch (error) {
      console.error("Error creating/updating budget:", error);
      showNotification("An error occurred", "error");
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
      await fetch(`${backendURL}/budgets/${budgetId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      showNotification("Budget deleted successfully!");
      fetchBudgets();
    } catch (error) {
      console.error("Error deleting budget:", error);
      showNotification("Failed to delete budget", "error");
    }
  };

  const resetForm = () => {
    setEditMode(false);
    setEditingBudgetId(null);
    setAccountId("");
    setAmount("");
  };

  // Calculate real percentage based on expenses
  const calculateSpending = (budget) => {
    if (!budget.account || !budget.account.name) return { spent: 0, percentage: 0 };

    // Find all expenses for this account
    const accountExpenses = expenses.filter(expense =>
      expense.account === budget.account.name
    );

    // Calculate total spent
    const totalSpent = accountExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate percentage of budget used
    const percentage = budget.amount > 0 ? Math.min(Math.round((totalSpent / budget.amount) * 100), 100) : 0;

    return {
      spent: totalSpent,
      percentage: percentage
    };
  };

  return (
    <div className="!bg-[linear-gradient(90deg,_rgba(2,0,36,1)_0%,_rgba(9,9,121,1)_47%,_rgba(0,0,0,1)_100%)] min-h-screen w-full">
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded shadow-lg flex items-center z-50 ${notification.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          {notification.type === 'error' ? <AlertCircle className="mr-2" size={20} /> : <CheckCircle className="mr-2" size={20} />}
          {notification.message}
        </div>
      )}

      <div className="max-w-full px-6 py-8 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white-800">Budget Manager</h1>
          <div className="flex items-center">
            <BarChart2 className="text-blue-600 mr-2" size={24} />
            <span className="text-white-600">Track your financial goals</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center" style={{ color: "#021024" }}>
            {editMode ? <Edit2 className="mr-2" size={18} /> : <Plus className="mr-2" size={18} />}
            {editMode ? "Edit Budget" : "Create New Budget"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium !text-black mb-1">Account</label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                disabled={editMode}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-100"
              >
                <option value="">Select Account</option>
                {accounts.map((acc) => (
                  <option key={acc._id} value={acc._id}>
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium !text-black mb-1">Budget Amount (₹)</label>
              <div className="relative">
                
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleCreateOrUpdateBudget}
                disabled={!amount || (!accountId && !editMode)}
                className="flex-1 p-3 !bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 flex items-center justify-center"
              >
                {editMode ? <Edit2 className="mr-2" size={18} /> : <Plus className="mr-2" size={18} />}
                {editMode ? "Update Budget" : "Create Budget"}
              </button>

              {editMode && (
                <button
                  onClick={resetForm}
                  className="ml-2 p-3 bg-ass-200 !text-black rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Budgets List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center !text-black">
            <CreditCard className="mr-2" size={18} />
            Your Budgets
          </h2>

          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : budgets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {budgets.map((budget) => {
                const { spent, percentage } = calculateSpending(budget);
                const remaining = budget.amount - spent > 0 ? budget.amount - spent : 0;

                return (
                  <div key={budget._id} className="bg-gray-50 rounded-lg p-5 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-lg !text-black">{budget.account?.name || "Unknown Account"}</h3>

                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleEditBudget(budget)}
                          className="p-1.5 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-700 transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteBudget(budget._id)}
                          className="p-1.5 bg-red-100 rounded-md hover:bg-red-200 text-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="font-semibold text-2xl text-black mr-2">₹{budget.amount.toLocaleString()}</span>
                      <span className="text-gray-500 text-sm ml-1">budget</span>
                    </div>

                    <div className="flex justify-between mb-2">
                      <div>
                        <span className="text-gray-600">Spent: </span>
                        <span className="font-medium text-black">₹{spent.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Remaining: </span>
                        <span className="font-medium text-black">₹{remaining.toLocaleString()}</span>
                      </div>
                    </div>

                    <div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                        <div
                          className={`h-3 rounded-full ${percentage > 90 ? 'bg-red-500' :
                              percentage > 75 ? 'bg-orange-500' :
                                percentage > 50 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 flex justify-between">
                        <span>{percentage}% spent</span>
                        <span className={percentage > 90 ? 'text-red-600 font-medium' : ''}>
                          {percentage > 90 ? 'Over budget!' :
                            percentage > 75 ? 'Warning: Budget limit approaching' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <CreditCard size={48} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 mb-4">No budgets found.</p>
              <p className="text-gray-500 text-sm">Create your first budget to start tracking your finances!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Budget;