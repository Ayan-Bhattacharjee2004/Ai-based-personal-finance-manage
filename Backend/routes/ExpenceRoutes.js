const express = require("express");
const router = express.Router();
const {
  createExpense,
  getAllExpenses,
  deleteExpense,
  updateExpense,
} = require("../controllers/ExpenceController");

router.post("/", createExpense);
router.get("/", getAllExpenses);
router.delete("/:id", deleteExpense);
router.put("/:id", updateExpense);

module.exports = router;
