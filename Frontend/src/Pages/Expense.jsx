import React, { useState, useEffect } from 'react';
import ExpenseForm from '../Components/Expense/ExpenseForm';
import ExpenseList from '../Components/Expense/ExpenceList';
import axios from 'axios';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const backendURL = 'http://localhost:7500/api/expenses';

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(backendURL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const expenseData = response.data.map((item) => ({
          ...item,
          id: item._id,
        }));
        setExpenses(expenseData);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleAddOrUpdate = async (data) => {
    try {
      const token = localStorage.getItem('token');
      if (data.id) {
        const res = await axios.put(`${backendURL}/${data.id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const updated = res.data;
        setExpenses((prev) =>
          prev.map((item) => (item.id === updated._id ? { ...updated, id: updated._id } : item))
        );
      } else {
        const res = await axios.post(backendURL, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const created = res.data.expense;
        setExpenses((prev) => [...prev, { ...created, id: created._id }]);
      }
      setShowForm(false);
      setEditingExpense(null);
    } catch (err) {
      console.error("Error saving expense:", err);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${backendURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  const handleAddClick = () => {
    setEditingExpense(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  return (
    <div className='IncomeC'>
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
