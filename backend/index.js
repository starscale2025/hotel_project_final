const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const userModel = require('./models/User')
const bookingModel = require('./models/Booking')
const tableModel = require('./models/Table');
const path = require('path')
const jwt = require('jsonwebtoken')
const adminAuth = require("./middleware/adminAuth");

connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/booking", require("./routes/booking"));

app.get("/admin/login", (req, res) => {
  res.render("login")
})

app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username , password)

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    let token = jwt.sign({ username }, process.env.SECRET_KEY, {
      expiresIn: "1d"
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax"
      // Change these when hosting
      // secure: true,
      // sameSite: "none"
    });

    // return res.json({ success: true });
    return res.redirect("http://localhost:5173/dashboard")
  }

  res.status(401).json({ message: "Invalid username or password" });
});


app.get("/dashboard", adminAuth , async (req, res) => {
  res.send("HI THIS IS DASHBOARD")
  // let bookings = await bookingModel.find()
  // res.json(bookings)
})

app.get("/dashboard/rooms", adminAuth , async (req, res) => {
  let bookings = await bookingModel.find()
  res.json(bookings)
})

app.get("/dashboard/tables", adminAuth , async (req, res) => {
  let reservations = await tableModel.find()
  res.json(reservations)
})

app.post("/api/bookings", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      checkIn,
      checkInTime,
      checkOut,
      checkOutTime,
      guests,
      roomType
    } = req.body;

    const booking = await bookingModel.create({
      firstName,
      lastName,
      email,
      phone,

      // store separately
      checkInDate: new Date(checkIn),
      checkInTime: checkInTime,

      checkOutDate: new Date(checkOut),
      checkOutTime: checkOutTime,

      guests,
      roomType
    });

    res.status(201).json({
      message: "Booking saved successfully",
      booking
    });

  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});


app.post("/api/table-booking", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, date, time, partySize, seatingPreference, occasion } = req.body;

    const table = await tableModel.create({
      firstName, lastName, email, phone, date, time, partySize, seatingPreference, occasion
    });

    res.status(201).json({ message: "Reservation made successfully", table });

  } catch (error) {
    console.error("Table booking error:", error);
    res.status(500).json({ message: "Failed to create table reservation", error: error.message });
  }
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
