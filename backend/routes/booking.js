const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { sendStatusMail } = require("../services/mailer");

router.put("/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    // send email only when confirmed/rejected
    if (status === "confirmed" || status === "rejected") {
      await sendStatusMail(booking.email, booking.firstName, status);
    }

    res.json({ message: "Status updated", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
