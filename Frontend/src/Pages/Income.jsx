import React, { useState, useEffect } from 'react';
import IncomeForm from '../Components/Income/IncomeForm';
import IncomeList from '../Components/Income/IncomeLIst';
import axios from 'axios';
import "./Income.css"
const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [editingIncome, setEditingIncome] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const backendURL = 'http://localhost:7500/api/incomes';

  // Load all income entries from backend when component mounts
  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await axios.get(backendURL);
        const incomeData = response.data.map((item) => ({
          ...item,
          id: item._id, // MUI DataGrid needs `id`, not `_id`
        }));
        setIncomes(incomeData);
      } catch (error) {
        console.error("Error fetching incomes:", error);
      }
    };

    fetchIncomes();
  }, []);

  // Add or Update Income
  const handleAddOrUpdate = async (data) => {
    try {
      if (data.id) {
        // Update
        const res = await axios.put(`${backendURL}/${data.id}`, data);
        const updated = res.data;
        setIncomes((prev) =>
          prev.map((item) => (item.id === updated._id ? { ...updated, id: updated._id } : item))
        );
      } else {
        // Create
        const res = await axios.post(backendURL, data);
        const created = res.data.income; // ✅ Fix: extract income from response
        setIncomes((prev) => [...prev, { ...created, id: created._id }]);
      }
      setShowForm(false);
      setEditingIncome(null);
    } catch (err) {
      console.error("Error saving income:", err);
    }
  };

  // Start editing
  const handleEdit = (income) => {
    setEditingIncome(income);
    setShowForm(true);
  };

  // Delete income from backend and state
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendURL}/${id}`);
      setIncomes((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting income:", err);
    }
  };

  // Show add form
  const handleAddClick = () => {
    setEditingIncome(null);
    setShowForm(true);
  };

  // Cancel form
  const handleCancel = () => {
    setShowForm(false);
    setEditingIncome(null);
  };

  return (
    <div className='IncomeC'>

      {showForm ? (
        <IncomeForm
          onSubmit={handleAddOrUpdate}
          editingData={editingIncome}
          onCancel={handleCancel}
        />
      ) : (
        <IncomeList
          incomes={incomes}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAddClick}
        />
      )}
    </div>
  );
};

export default Income;
