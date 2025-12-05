const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  partySize: { type: Number, default: 2 },
  seatingPreference: { type: String, default: "Deluxe Suite" },
  occasion: { type: String },
  status: { type: String, enum: ["hold", "confirmed", "rejected"], default: "hold" }
});

module.exports = mongoose.model("table", tableSchema);
