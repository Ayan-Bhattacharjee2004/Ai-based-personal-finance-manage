import React, { useState, useEffect } from 'react';
import ExpenseForm from '../Components/Expense/ExpenseForm';
import ExpenseList from '../Components/Expense/ExpenceList';
import axios from 'axios';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const backendURL = 'http://localhost:7500/api/expenses';

  // Load all expense entries from backend when component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(backendURL);
        const expenseData = response.data.map((item) => ({
          ...item,
          id: item._id, // MUI DataGrid needs `id`, not `_id`
        }));
        setExpenses(expenseData);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  // Add or Update Expense
  const handleAddOrUpdate = async (data) => {
    try {
      if (data.id) {
        // Update
        const res = await axios.put(`${backendURL}/${data.id}`, data);
        const updated = res.data;
        setExpenses((prev) =>
          prev.map((item) => (item.id === updated._id ? { ...updated, id: updated._id } : item))
        );
      } else {
        // Create
        const res = await axios.post(backendURL, data);
        const created = res.data.expense; // ✅ Fix: extract expense from response
        setExpenses((prev) => [...prev, { ...created, id: created._id }]);
      }
      setShowForm(false);
      setEditingExpense(null);
    } catch (err) {
      console.error("Error saving expense:", err);
    }
  };

  // Start editing
  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  // Delete expense from backend and state
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendURL}/${id}`);
      setExpenses((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  // Show add form
  const handleAddClick = () => {
    setEditingExpense(null);
    setShowForm(true);
  };

  // Cancel form
  const handleCancel = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  return (
    <div style={{ padding: '30px' }}>
      {showForm ? (
        <ExpenseForm
          onSubmit={handleAddOrUpdate}
          editingData={editingExpense}
          onCancel={handleCancel}
        />
      ) : (
        <ExpenseList
          expenses={expenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAddClick}
        />
      )}
    </div>
  );
};

export default Expense;
