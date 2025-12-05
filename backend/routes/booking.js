const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const tableModel = require("../models/Table");
const { sendStatusMail } = require("../services/mailer");

router.put("/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const { type } = req.query;

    let booking;

    if (type === "table") {
      booking = await tableModel.findById(req.params.id);
    } else {
      booking = await Booking.findById(req.params.id);
    }

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    // send email
    if (status === "confirmed" || status === "rejected") {
      await sendStatusMail(booking.email, booking.firstName, status);
    }

    res.json({ message: "Status updated", booking });
  } catch (error) {
    console.log("Update status error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
