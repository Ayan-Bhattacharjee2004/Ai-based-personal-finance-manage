const express = require("express");
const router = express.Router();
const { createExpense, getAllExpenses, deleteExpense, updateExpense } = require("../controllers/ExpenceController");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ Protecting routes

// 🛡️ Only logged-in users can access expenses
router.post("/", authMiddleware, createExpense);
router.get("/", authMiddleware, getAllExpenses);
router.delete("/:id", authMiddleware, deleteExpense);
router.put("/:id", authMiddleware, updateExpense);

module.exports = router;
