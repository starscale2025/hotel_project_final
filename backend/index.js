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
const PORT = process.env.PORT || 5000;

connectDB();



const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "https://hotel-project-final-murex.vercel.app",
];

// CORS configuration with proper origin function for credentials
app.use(cors({
  origin: function (origin, callback) {
    // For requests with no origin (like mobile apps, Postman, or same-origin requests)
    // Allow them but don't set Access-Control-Allow-Credentials
    if (!origin) {
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      // Return the origin string (required when credentials: true)
      callback(null, origin);
    } else {
      // Log for debugging
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
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

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ username }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res.json({
      success: true,
      token, // send token to frontend
    });
  }

  res.status(401).json({ message: "Invalid username or password" });
});


app.post("/api/auth/google", async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "Missing credential" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub, picture } = payload;

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        email,
        name,
        googleId: sub,
        avatar: picture,
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token, user });
  } catch (err) {
    console.error("Google auth error:", err);
    res.status(400).json({ message: "Google authentication failed" });
  }
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
