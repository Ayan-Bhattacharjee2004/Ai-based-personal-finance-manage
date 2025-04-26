const express = require("express");
const router = express.Router();
const { createIncome, getAllIncomes, deleteIncome, updateIncome } = require("../controllers/IncomeController");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ Protecting routes

// 🛡️ Only logged-in users can access incomes
router.post("/", authMiddleware, createIncome);
router.get("/", authMiddleware, getAllIncomes);
router.delete("/:id", authMiddleware, deleteIncome);
router.put("/:id", authMiddleware, updateIncome);

module.exports = router;
