import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiSettings, FiUser, FiPlus, FiTrash2 } from "react-icons/fi";
import { FaChartBar, FaWallet, FaUserFriends } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import RealEstateAgentIcon from '@mui/icons-material/RealEstateAgent';
import axios from "axios";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.get('http://localhost:7500/api/accounts', config);
        console.log("Accounts fetched:", response.data); // Debug
        setAccounts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch accounts:", err);
        setError("Failed to load accounts.");
        setLoading(false);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchAccounts();
  }, [navigate]);

  const handleDeleteAccount = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.delete(`http://localhost:7500/api/accounts/${id}`, config);
      setAccounts(accounts.filter(account => account._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete account.");
    }
  };

  const handleAddAccount = () => navigate('/add-account');

  const incomeData = [5, 6, 4.5, 5.5, 3, 6, 4.5, 6, 7.5, 3];
  const expenseData = [4, 5, 3.5, 4.5, 2, 5, 3.5, 5, 6.5, 2];

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [
      { label: "Income", backgroundColor: "#4F46E5", data: incomeData },
      { label: "Expenses", backgroundColor: "#6366F1", data: expenseData },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true, ticks: { color: "#cbd5e1" } },
      x: { ticks: { color: "#cbd5e1" } },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div className="relative min-h-screen">
      <div className="flex h-screen w-screen bg-gray-50">
        {/* Sidebar */}
        <div className="fixed top-0 left-0 min-h-screen w-20 bg-blue-700 flex flex-col items-center py-6 space-y-6">
          <div className="text-white text-2xl"><RealEstateAgentIcon /></div>
          <FaChartBar className="text-white text-2xl cursor-pointer" onClick={() => navigate('/income')} />
          <FaWallet className="text-white text-2xl cursor-pointer" onClick={() => navigate('/expense')} />
          <FaUserFriends className="text-white text-2xl" onClick={() => navigate("/budget")} />
          <FiSettings className="text-white text-2xl mt-auto" />
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-20 flex flex-col">
          {/* Navbar */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center w-1/2">
              <input className="w-full p-2 rounded-l-md border border-gray-300" placeholder="Search Here" />
              <button className="bg-blue-600 p-2 rounded-r-md text-white">
                <FiSearch />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300 flex items-center gap-2 font-medium group"
                onClick={() => navigate('/add-budget')}
              >
                <span className="bg-white text-blue-600 rounded-full p-1 group-hover:rotate-90 transition-transform duration-300 flex items-center justify-center">
                  <FiPlus size={12} />
                </span>
                <span className="text-white font-semibold">Add Budget</span>
              </button>
              <FiSettings className="text-xl text-gray-600" />
              <FiBell className="text-xl text-gray-600" />
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white">
                <FiUser />
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-black">Dashboard</h1>
          </div>
          <p className="px-6 text-gray-500">Welcome to <b>BudgetBee</b> Finance Tracker</p>

          {/* Accounts Section */}
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Your Accounts</h2>
            {loading ? (
              <div className="text-center py-4">Loading accounts...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Add New */}
                <div
                  className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors duration-300 border-2 border-dashed border-gray-300"
                  onClick={handleAddAccount}
                >
                  <div className="text-gray-400 text-3xl mb-2">+</div>
                  <p className="text-gray-500 font-medium">Add New Account</p>
                </div>

                {/* Account Cards */}
                {accounts.map(account => (
                  <div key={account._id} className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-blue-900">{account.name}</h3>
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-sm text-gray-500 font-medium">Total Amount</p>
                          
                          <p className="text-xl font-bold text-black pl-4">
                          ₹{account.balance ? account.balance.toFixed(2) : "0.00"}
                          </p>
                        </div>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700 flex items-center"
                        onClick={() => handleDeleteAccount(account._id)}
                      >
                        <FiTrash2 size={14} className="mr-1" />
                        <span className="text-xs">Delete</span>
                      </button>
                    </div>
                    <div className="flex justify-between mt-4 text-sm">
                      <div className="flex items-center text-green-600">
                        <span className="mr-1">↑</span><span>Income</span>
                      </div>
                      <div className="flex items-center text-red-600">
                        <span className="mr-1">↓</span><span>Expenses</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-6 p-6">
            <div className="bg-white rounded-xl p-4 shadow">
              <h2 className="text-xl font-bold">Balance Trends</h2>
              <p className="text-gray-500">$221,478</p>
              <div className="h-48 bg-gray-100 mt-4 rounded-md flex items-center justify-center">
                Chart Here
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              <h2 className="text-xl font-bold">Monthly Expenses Breakdown</h2>
              <div className="mt-4 space-y-2">
                <ExpenseItem color="orange" label="Food" amount="$1,200" percent="38%" />
                <ExpenseItem color="yellow" label="Transport" amount="$700" percent="22%" />
                <ExpenseItem color="green" label="Healthcare" amount="$400" percent="12%" />
              </div>
            </div>
          </div>

          {/* Bar Chart Section */}
          <div className="p-6 bg-gray-50">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-6">Monthly Income vs Expenses</h2>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-400 py-4">
            © {new Date().getFullYear()} <span className="font-bold text-blue-600">BudgetBee</span> | All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

function ExpenseItem({ color, label, amount, percent }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full bg-${color}-500 mr-2`}></div>
        <span>{label}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-gray-500">{amount}</span>
        <span className="text-gray-400">{percent}</span>
      </div>
    </div>
  );
}

export default Dashboard;
