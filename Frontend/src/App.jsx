
import './App.css'
import ProtectedRoute from './Components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Dashboard from "./Pages/Dashboard"
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp"
function App() {
  return (
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
}

export default App;

