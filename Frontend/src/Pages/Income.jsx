import React, { useState, useEffect } from 'react';
import IncomeForm from '../Components/Income/IncomeForm';
import IncomeList from '../Components/Income/IncomeLIst';
import axios from 'axios';
import "./Income.css";

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [editingIncome, setEditingIncome] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const backendURL = 'http://localhost:7500/api/incomes';

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(backendURL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const incomeData = response.data.map((item) => ({
          ...item,
          id: item._id,
        }));
        setIncomes(incomeData);
      } catch (error) {
        console.error("Error fetching incomes:", error);
      }
    };

    fetchIncomes();
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
        setIncomes((prev) =>
          prev.map((item) => (item.id === updated._id ? { ...updated, id: updated._id } : item))
        );
      } else {
        const res = await axios.post(backendURL, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const created = res.data.income;
        setIncomes((prev) => [...prev, { ...created, id: created._id }]);
      }
      setShowForm(false);
      setEditingIncome(null);
    } catch (err) {
      console.error("Error saving income:", err);
    }
  };

  const handleEdit = (income) => {
    setEditingIncome(income);
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
      setIncomes((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting income:", err);
    }
  };

  const handleAddClick = () => {
    setEditingIncome(null);
    setShowForm(true);
  };

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
