import React from "react";
import "./IncomeList.css";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaidIcon from '@mui/icons-material/Paid';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import SchoolIcon from '@mui/icons-material/School';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ReplayIcon from '@mui/icons-material/Replay';
import CategoryIcon from '@mui/icons-material/Category';

const categoryIcons = {
  "Salary": <WorkIcon fontSize="small" />,
  "Freelance": <CodeIcon fontSize="small" />,
  "Investments": <TrendingUpIcon fontSize="small" />,
  "Rental Income": <HomeWorkIcon fontSize="small" />,
  "Business": <BusinessCenterIcon fontSize="small" />,
  "Interest": <AttachMoneyIcon fontSize="small" />,
  "Dividends": <PaidIcon fontSize="small" />,
  "Grants": <EmojiObjectsIcon fontSize="small" />,
  "Scholarship": <SchoolIcon fontSize="small" />,
  "Gifts": <CardGiftcardIcon fontSize="small" />,
  "Refunds": <ReplayIcon fontSize="small" />,
  "Other": <CategoryIcon fontSize="small" />,
};

const IncomeList = ({ incomes, onEdit, onDelete, onAdd }) => {
  const columns = [
    { field: "amount", headerName: "Amount", width: 100 },
    { field: "account", headerName: "Account", width: 130 },
    {
      field: "category",
      headerName: "Category",
      width: 180,
      renderCell: (params) => {
        const icon = categoryIcons[params.value];
        return (
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {icon} {params.value}
          </span>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 130,
      renderCell: (params) => {
        const rawDate = new Date(params.value);
        const day = String(rawDate.getDate()).padStart(2, '0');
        const month = String(rawDate.getMonth() + 1).padStart(2, '0');
        const year = rawDate.getFullYear();
        return `${day}-${month}-${year}`;
      },
    },
    { field: "description", headerName: "Description", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit" arrow>
            <IconButton
              color="primary"
              size="small"
              onClick={() => onEdit(params.row)}
              sx={{
                '&:focus': { outline: 'none' },
                '&:focus-visible': { boxShadow: 'none' },
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <IconButton
              color="error"
              size="small"
              onClick={() => onDelete(params.row.id)}
              sx={{
                '&:focus': { outline: 'none' },
                '&:focus-visible': { boxShadow: 'none' },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  // Bar chart data
  const categoryMap = {};
  incomes.forEach(({ category, amount }) => {
    if (!categoryMap[category]) categoryMap[category] = 0;
    categoryMap[category] += Number(amount);
  });
  const barChartData = Object.entries(categoryMap).map(([key, value]) => ({ category: key, value }));

  // Pie chart data
  const accountMap = {};
  incomes.forEach(({ account, amount }) => {
    if (!accountMap[account]) accountMap[account] = 0;
    accountMap[account] += Number(amount);
  });
  const pieChartData = Object.entries(accountMap).map(([key, value], index) => ({
    id: index,
    value,
    label: key,
  }));

  return (
    <div style={{ marginTop: "40px" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          <AccountBalanceWalletIcon /> INCOME HISTORY
        </Typography>
        <Button
          onClick={onAdd}
          sx={{
            backgroundColor: '#6c63ff',
            color: 'white',
            '&:hover': {
              backgroundColor: '#574df5',
            },
          }}
        >
          <AddIcon />
          Add Transaction
        </Button>
      </Stack>

      <Paper sx={{ height: 420, width: "100%" }}>
        <DataGrid
          rows={incomes.map((income) => ({ id: income._id, ...income }))}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          checkboxSelection
          sx={{ border: 0, boxShadow: 5 }}
        />
      </Paper>

      <div className="Chart">
        <BarChart
          xAxis={[{ scaleType: 'band', data: barChartData.map((item) => item.category) }]}
          series={[{ data: barChartData.map((item) => item.value), label: "Income by Category" }]}
          height={300}
          width={500}
          margin={{ top: 60, bottom: 30, left: 40, right: 10 }}
        />

        <PieChart
          series={[{ data: pieChartData }]}
          width={400}
          height={250}
        />
      </div>

      <label className="label"><AccountBalanceIcon /> Income by Account</label>
      <footer className="footerfor">Made by Team KARY — Turning ideas into reality. 😊</footer>
    </div>
  );
};

export default IncomeList;
