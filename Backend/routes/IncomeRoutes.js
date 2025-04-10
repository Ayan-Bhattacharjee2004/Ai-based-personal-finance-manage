const express = require("express");
const router = express.Router();
const {
  createIncome,
  getAllIncomes,
  deleteIncome,
  updateIncome,
} = require("../controllers/IncomeController");

router.post("/", createIncome);
router.get("/", getAllIncomes);
router.delete("/:id", deleteIncome);
router.put("/:id", updateIncome);

module.exports = router;
