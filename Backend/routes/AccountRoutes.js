const express = require("express");
const router = express.Router();
const { getAccounts, createAccount } = require("../controllers/AccountControllers");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ import auth

router.get("/", authMiddleware, getAccounts);  // ✅ protect route
router.post("/", authMiddleware, createAccount); // ✅ protect route

module.exports = router;
