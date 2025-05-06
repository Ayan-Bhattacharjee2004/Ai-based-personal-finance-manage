require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDB = require("./Config/db");
const incomeRoutes = require("./routes/IncomeRoutes");
const expenseRoutes = require("./routes/ExpenceRoutes");
const accountRoutes = require("./routes/AccountRoutes");
const authRoutes = require("./routes/authRouts");
const budgetRoutes = require("./routes/budgetRoutes");
const contactRoutes = require("./routes/contactRoutes"); // NEW for contact form

const app = express();
const PORT = process.env.PORT || 7500; // Port 7500 for your backend

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
ConnectDB();

// Routes
app.use("/api/incomes", incomeRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/contact", contactRoutes); // Registering the new contact route

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
