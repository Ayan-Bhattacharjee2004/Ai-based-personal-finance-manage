const express = require("express");
const router = express.Router();
const { getAccounts, createAccount } = require("../controllers/AccountControllers");
const authMiddleware = require("../middleware/authMiddleware");

// Get all accounts for logged in user
router.get("/", authMiddleware, getAccounts);

// Create new account for logged in user
router.post("/", authMiddleware, createAccount);

// Delete an account (new endpoint)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const Account = require("../models/AccountModel");
    
    // Find account by ID and make sure it belongs to the logged in user
    const account = await Account.findOne({ 
      _id: req.params.id, 
      userId: req.user 
    });
    
    if (!account) {
      return res.status(404).json({ message: "Account not found or unauthorized" });
    }
    
    // Delete the account
    await Account.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;