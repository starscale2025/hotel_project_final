const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  checkInDate: { type: Date, required: true },
  checkInTime: { type: String, required: true },

  checkOutDate: { type: Date, required: true },
  checkOutTime: { type: String, required: true },

  guests: { type: Number, default: 2 },
  roomType: { type: String, default: "Deluxe Suite" },

  nights: { type: Number },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["hold", "confirmed", "rejected"], default: "hold" }
});

// Calculate nights
bookingSchema.pre("save", function () {
  if (this.checkInDate && this.checkOutDate) {
    const diff = this.checkOutDate - this.checkInDate;
    this.nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
