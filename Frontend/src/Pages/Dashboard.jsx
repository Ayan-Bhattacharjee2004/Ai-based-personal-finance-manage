import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiSettings, FiUser, FiPlus, FiTrash2 } from "react-icons/fi";
import { FaChartBar, FaWallet, FaUserFriends } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Title,
  Tooltip,
  Legend 
} from "chart.js";
import RealEstateAgentIcon from '@mui/icons-material/RealEstateAgent';
import { IoWallet } from "react-icons/io5";
import axios from "axios";
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';

// Register ALL necessary Chart.js components
ChartJS.register(
  BarElement, 
  CategoryScale, 
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get('http://localhost:7500/api/accounts', config);
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

    const fetchIncomeExpense = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        const [incomeRes, expenseRes] = await Promise.all([
          axios.get(`http://localhost:7500/api/incomes?month=${month}&year=${year}`, config),
          axios.get(`http://localhost:7500/api/expenses?month=${month}&year=${year}`, config),
        ]);

        setIncomeList(incomeRes.data);
        setExpenseList(expenseRes.data);
      } catch (err) {
        console.error("Error fetching income/expense:", err);
      }
    };

    fetchAccounts();
    fetchIncomeExpense();
  }, [navigate]); 

  const handleDeleteAccount = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:7500/api/accounts/${id}`, config);
      setAccounts(accounts.filter(account => account._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete account.");
    }
  };

  const handleAddAccount = () => navigate('/add-account');

  // monthly chart data
  const now = new Date();
  const currentMonthName = now.toLocaleString('default', { month: 'short' });
  const totalIncome = incomeList.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenseList.reduce((sum, item) => sum + item.amount, 0);

  const chartData = {
    labels: [currentMonthName],
    datasets: [
      { 
        label: "Income", 
        backgroundColor: "#4ade80", // Green for income
        data: [totalIncome],
        borderWidth: 1,
        borderColor: "#2f9e44"
      },
      { 
        label: "Expenses", 
        backgroundColor: "#f87171", // Red for expenses
        data: [totalExpense],
        borderWidth: 1,
        borderColor: "#e11d48"
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { 
        beginAtZero: true, 
        ticks: { 
          color: "#334155", // Dark text for better visibility
          font: {
            weight: 'bold',
            size: 12
          }
        },
        grid: {
          color: "rgba(203, 213, 225, 0.4)" // Lighter grid lines
        },
        title: {
          display: true,
          text: 'Amount (₹)',
          color: "#334155",
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      x: { 
        ticks: { 
          color: "#334155", // Dark text for better visibility
          font: {
            weight: 'bold',
            size: 14
          }
        },
        grid: {
          display: false // Remove x-axis grid lines for cleaner look
        }
      },
    },
    plugins: { 
      legend: { 
        display: true,
        position: 'top',
        labels: {
          color: "#334155",
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ₹${context.raw.toLocaleString()}`;
          }
        }
      }
    },
  };

  const sidebarItems = [
    { icon: <FaChartBar className="text-2xl" />, text: "Dashboard", route: "/" },
    { icon: <FaWallet className="text-2xl" />, text: "Income", route: "/income" },
    { icon: <IoWallet className="text-3xl" />, text: "Expense", route: "/expense" },
    { icon: <FaUserFriends className="text-2xl" />, text: "Contacts", route: "/contact" },
  ];

  const SidebarLink = ({ icon, text, onClick }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    return (
      <div 
        className="relative py-4 w-full flex justify-center"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={onClick}
      >
        <div className="text-white cursor-pointer hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
        {showTooltip && (
          <div className="absolute left-20 bg-blue-800 text-white px-3 py-2 rounded-md whitespace-nowrap shadow-lg z-50">
            <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-blue-800"></div>
            {text}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen">
      <div className="flex h-100% w-100% bg-[linear-gradient(90deg,_rgba(2,0,36,1)_0%,_rgba(9,9,121,1)_47%,_rgba(0,0,0,1)_100%)]">
        {/* Sidebar */}
        <div className="fixed top-0 left-0 min-h-screen w-20 bg-blue-700 flex flex-col items-center py-6">
          <div className="text-white text-2xl mb-8 relative group cursor-pointer">
            <RealEstateAgentIcon />
            <div className="absolute left-20 bg-blue-800 text-white px-3 py-2 rounded-md whitespace-nowrap shadow-lg z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-blue-800"></div>
              BudgetBee
            </div>
          </div>
          {sidebarItems.map((item, index) => (
            <SidebarLink 
              key={index}
              icon={item.icon} 
              text={item.text}
              onClick={() => navigate(item.route)}
            />
          ))}
          <div className="mt-auto">
            <SidebarLink 
              icon={<FiSettings className="text-white text-2xl" />} 
              text="Settings"
              onClick={() => navigate("/settings")}
            />
          </div>
        </div>

        <div className="flex-1 ml-20 flex flex-col">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center w-1/2">
              <input className="w-full p-2 rounded-l-md border border-gray-300" placeholder="Search Here" />
              <button className="ml-3 !bg-blue-600 !p-3.5 !rounded-r-md text-white"><FiSearch /></button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300 flex items-center gap-2 font-medium group"
                onClick={() => navigate('/budget')}
              >
                <span className="bg-white text-blue-600 rounded-full p-1 group-hover:rotate-90 transition-transform duration-300 flex items-center justify-center">
                  <FiPlus size={12} />
                </span>
                <span className="text-white font-semibold">Add Budget</span>
              </button>
              <FiSettings className="text-xl text-gray-600" />
              <FiBell className="text-xl text-gray-600" />
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white"><FiUser /></div>
            </div>
          </div>

          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          </div>
          <p className="px-6 text-gray-500">Welcome to <b>BudgetBee</b> Finance Tracker</p>

          {/* Accounts */}
          <div className="px-6 py-4">
            <h2 className="!text-[30px] font-semibold !text-white mb-4">Your Accounts</h2>
            {loading ? (
              <div className="text-center py-4 text-white">Loading accounts...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors duration-300 border-2 border-dashed border-gray-300"
                  onClick={handleAddAccount}
                >
                  <div className="text-gray-400 text-3xl mb-2">+</div>
                  <p className="text-gray-500 font-medium">Add New Account</p>
                </div>
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
                      <button className="text-red-500 hover:text-red-700 flex items-center"
                        onClick={() => handleDeleteAccount(account._id)}>
                        <FiTrash2 size={14} className="mr-1" />
                        <span className="text-xs">Delete</span>
                      </button>
                    </div>
                    <div className="flex justify-between mt-4 text-sm">
                      <div className="flex items-center text-green-600"><span className="mr-1">↑</span>Income</div>
                      <div className="flex items-center text-red-600"><span className="mr-1">↓</span>Expenses</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Charts */}
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-6">Monthly Income vs Expenses</h2>
              <div className="h-64">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>

          <div className="text-center text-gray-400 py-4 mt-auto">
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