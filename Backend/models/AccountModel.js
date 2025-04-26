const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ ADD this
});

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
