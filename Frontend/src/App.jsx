import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from './Components/ProtectedRoute';
import HomePage from "./Components/HomePage";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Income from './Pages/Income';
import ExpenseForm from './Components/Expense/ExpenseForm';
import Expense from './Pages/Expense';
import Budget from './Pages/Budget';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </Router>
  );
}

export default App;
