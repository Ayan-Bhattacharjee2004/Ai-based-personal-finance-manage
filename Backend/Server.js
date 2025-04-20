require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDB = require("./Config/db");
const incomeRoutes = require("./routes/IncomeRoutes");
const expenseRoutes = require("./routes/ExpenceRoutes"); // <== NEW for expenses
const accountRoutes = require("./routes/AccountRoutes");
const authRoutes = require("./routes/authRouts");

const app = express();
const PORT = process.env.PORT || 6500;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
ConnectDB();

// Routes
app.use("/api/incomes", incomeRoutes);
<<<<<<< HEAD
app.use("/api/accounts", accountRoutes); // <== NEW for accounts
app.use("/api/auth", authRoutes);
=======
app.use("/api/expenses", expenseRoutes); // <== NEW for expenses
app.use("/api/accounts", accountRoutes);
>>>>>>> 4a1c2e86324ae9a8ee3e7385400dc927904c4afb

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
