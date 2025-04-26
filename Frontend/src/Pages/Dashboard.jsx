import { useState } from "react";
import React, { useEffect } from 'react';
// import { Card } from "@/components/ui/card"; // If you're using shadcn/ui or similar
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiSettings, FiUser } from "react-icons/fi";
import { FaChartBar, FaWallet, FaExchangeAlt, FaBullseye, FaUserFriends, FaClipboardList, FaLink } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import RealEstateAgentIcon from '@mui/icons-material/RealEstateAgent';
ChartJS.register(BarElement, CategoryScale, LinearScale);


  const Dashboard = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
    }, [navigate]);
    const budgetData = [
      { label: "Grocery Stores", value: 75, icon: "🥦", color: "bg-green-400" },
      { label: "Transportation", value: 25, icon: "🚗", color: "bg-cyan-400" },
      { label: "Pets", value: 50, icon: "🐾", color: "bg-cyan-400" },
      { label: "Education", value: 45, icon: "🎓", color: "bg-purple-400" },
      { label: "Clothes", value: 35, icon: "🛍️", color: "bg-purple-300" },
    ];
  
    const incomeData = [5, 6, 4.5, 5.5, 3, 6, 4.5, 6, 7.5, 3];
    const expenseData = [4, 5, 3.5, 4.5, 2, 5, 3.5, 5, 6.5, 2];
  
    const chartData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
      datasets: [
        {
          label: "Income",
          backgroundColor: "#4F46E5",
          data: incomeData,
        },
        {
          label: "Expenses",
          backgroundColor: "#6366F1",
          data: expenseData,
        },
      ],
    };
  
    const chartOptions = {
      responsive: true,
      scales: {
        y: { beginAtZero: true, ticks: { color: "#cbd5e1" } },
        x: { ticks: { color: "#cbd5e1" } },
      },
      plugins: {
        legend: { display: false },
      },
    };
  return (
    <div className="relative min-h-screen">
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 min-h-screen w-20 bg-blue-700 flex flex-col items-center py-6 space-y-6">
        <div className="text-white text-2xl"><RealEstateAgentIcon/></div>
        {/* <FaChartBar className="text-white text-2xl" /> */}
        <FaChartBar
            className="text-white text-2xl cursor-pointer"
            onClick={() => navigate('/income')}
          />
        <FaWallet className="text-white text-2xl cursor-pointer"
            onClick={() => navigate('/expense')}/>
        
        <FaUserFriends className="text-white text-2xl" />
      
        <FiSettings className="text-white text-2xl mt-auto" />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-20 flex flex-col">
        {/* Navbar */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center w-1/2">
            <input
              className="w-full p-2 rounded-l-md border border-gray-300"
              placeholder="Search Here"
            />
            <button className="bg-blue-600 p-2 rounded-r-md text-white">
              <FiSearch />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <FiSettings className="text-xl text-gray-600" />
            <FiBell className="text-xl text-gray-600" />
            <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white">
              <FiUser />
            </div>
          </div>
        </div>

        {/* Dashboard Header */}
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome Ekash Finance Management</p>
        </div>

        {/* Cards Section */}
        {/* <div className="grid grid-cols-4 gap-6 px-6">
          <DashboardCard title="Total Balance" amount="$432,568" percentage="3.12%" subtitle="Last month $28,940" up={true} />
          <DashboardCard title="Total Period Change" amount="$245,860" percentage="1.98%" subtitle="Last month $21,230" up={true} />
          <DashboardCard title="Total Period Expenses" amount="$2,530" percentage="4.78%" subtitle="Last month $26,340" up={false} />
          <DashboardCard title="Total Period Income" amount="$24,560" percentage="2.84%" subtitle="Last month $23,890" up={true} />
        </div> */}

        {/* Graphs Section */}
        <div className="grid grid-cols-2 gap-6 p-6">
          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="text-xl font-bold">Balance Trends</h2>
            <p className="text-gray-500">$221,478</p>
            {/* Placeholder for chart */}
            <div className="h-48 bg-gray-100 mt-4 rounded-md flex items-center justify-center">
              Chart Here
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="text-xl font-bold">Monthly Expenses Breakdown</h2>
            {/* Placeholder for breakdown */}
            <div className="mt-4 space-y-2">
              <ExpenseItem color="orange" label="Food" amount="$1,200" percent="38%" />
              <ExpenseItem color="yellow" label="Transport" amount="$700" percent="22%" />
              <ExpenseItem color="green" label="Healthcare" amount="$400" percent="12%" />
              {/* Add more if you want */}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Monthly Budgets */}
      <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-1/2">
        <h2 className="text-xl font-bold text-blue-900 mb-6">Monthly Budgets</h2>
        <div className="space-y-4">
          {budgetData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`text-2xl ${item.color} p-2 rounded-full`}>
                  {item.icon}
                </div>
                <div className="text-blue-900 font-medium">{item.label}</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-blue-900 font-semibold">
                  {item.value} <span className="text-gray-400">/ 100</span>
                </div>
                <div className="w-32 bg-gray-200 h-2 rounded-full mt-1">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${item.value}%`, backgroundColor: item.color.replace("bg-", "#") }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Income vs Expenses */}
      <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-1/2">
        <h2 className="text-xl font-bold text-blue-900 mb-6">Monthly Income vs Expenses</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Weekly Expenses Section */}
      {/* <Card className="flex-1">
        <CardContent className="p-6"> */}
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Weekly Expenses</h2>
          <div className="h-72">
            {/* <WeeklyExpensesChart /> */}
          </div>
        {/* </CardContent>
      </Card> */}

      {/* Payments History Section */}
      {/* <Card className="w-full md:w-1/3">
        <CardContent className="p-6"> */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-700">Payments History</h2>
            {/* <Button variant="link" className="text-blue-500 text-sm">
              See more
            </Button> */}
          </div>

          <div className="space-y-6">
            {[
              { name: "Electricity", date: "5 January 2024", amount: "+450.00", status: "Paid" },
              { name: "Internet", date: "5 January 2024", amount: "+450.00", status: "Due" },
              { name: "Apple Music", date: "5 January 2024", amount: "+450.00", status: "Cancel" },
              { name: "Groceries", date: "5 January 2024", amount: "+450.00", status: "Paid" },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b pb-4 last:border-none">
                <div>
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{item.amount}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.status === "Paid"
                        ? "bg-green-100 text-green-600"
                        : item.status === "Due"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        {/* </CardContent>
      </Card> */}
    </div>

        {/* Footer */}
        <div className="text-center text-gray-400 py-4">
          © Copyright <span className="font-bold text-blue-600">Ekash</span> | All Rights Reserved
        </div>
      </div>
    </div>
    </div>
  );
}

function DashboardCard({ title, amount, percentage, subtitle, up }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-blue-900 mt-2">{amount}</p>
      <div className="flex items-center text-sm mt-2">
        <span className={up ? "text-green-500" : "text-red-500"}>{up ? "↑" : "↓"} {percentage}</span>
        <span className="ml-2 text-gray-400">{subtitle}</span>
      </div>
    </div>
  );
}

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
