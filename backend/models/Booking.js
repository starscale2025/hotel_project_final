const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, default: 2 },
  roomType: { type: String, default: "Deluxe Suite" },
  nights: { type: Number },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["hold", "confirmed", "rejected"], default: "hold" }
});

bookingSchema.pre("save", function () {
  if (this.checkIn && this.checkOut) {
    const diffTime = Math.abs(this.checkOut - this.checkIn);
    this.nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
