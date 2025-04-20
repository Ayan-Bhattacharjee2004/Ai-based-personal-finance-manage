
import './App.css'
<<<<<<< HEAD
import ProtectedRoute from './Components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Dashboard from "./Pages/Dashboard"
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp"
=======
import Income from './Pages/Income'
import ExpenseForm from './Components/Expense/ExpenseForm'
import Expense from './Pages/Expense'

>>>>>>> 4a1c2e86324ae9a8ee3e7385400dc927904c4afb
function App() {
  return (
<<<<<<< HEAD
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      <Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
    </Routes>
  </Router>
  );
=======
    <>
      {/* <IncomeForm/> */}
      {/* <Dashboard/> */}
      <Income/>
      {/* <ExpenseForm/> */}
      <Expense/>
    </>
  )
>>>>>>> 4a1c2e86324ae9a8ee3e7385400dc927904c4afb
}

export default App;

