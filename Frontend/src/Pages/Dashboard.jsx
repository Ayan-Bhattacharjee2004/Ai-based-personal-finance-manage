import { useState } from "react";
import { FiSearch, FiBell, FiSettings, FiUser } from "react-icons/fi";
import { FaChartBar, FaWallet, FaExchangeAlt, FaBullseye, FaUserFriends, FaClipboardList, FaLink } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-20 bg-blue-700 flex flex-col items-center py-6 space-y-6">
        <div className="text-white text-2xl">🏦</div>
        <FaChartBar className="text-white text-2xl" />
        <FaWallet className="text-white text-2xl" />
        <FaExchangeAlt className="text-white text-2xl" />
        <FaBullseye className="text-white text-2xl" />
        <FaUserFriends className="text-white text-2xl" />
        <FaClipboardList className="text-white text-2xl" />
        <FaLink className="text-white text-2xl" />
        <FiSettings className="text-white text-2xl mt-auto" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
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
        <div className="grid grid-cols-4 gap-6 px-6">
          <DashboardCard title="Total Balance" amount="$432,568" percentage="3.12%" subtitle="Last month $28,940" up={true} />
          <DashboardCard title="Total Period Change" amount="$245,860" percentage="1.98%" subtitle="Last month $21,230" up={true} />
          <DashboardCard title="Total Period Expenses" amount="$2,530" percentage="4.78%" subtitle="Last month $26,340" up={false} />
          <DashboardCard title="Total Period Income" amount="$24,560" percentage="2.84%" subtitle="Last month $23,890" up={true} />
        </div>

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

        {/* Footer */}
        <div className="text-center text-gray-400 py-4">
          © Copyright <span className="font-bold text-blue-600">Ekash</span> | All Rights Reserved
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

