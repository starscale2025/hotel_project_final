const express = require('express');
const app = express();
require("dotenv").config();

const cors = require('cors');
const connectDB = require('./config/db');
const bookingModel = require('./models/Booking');
// const passport = require('passport');
const session = require('express-session');
// require('./config/passport');

// 🔗 Connect to MongoDB
connectDB();

// middlewares
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// Auth Routes
// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // Successful authentication, redirect dashboard.
//     res.redirect('http://localhost:5173/dashboard');
//   }
// );

// app.get('/auth/logout', (req, res, next) => {
//   req.logout((err) => {
//     if (err) { return next(err); }
//     res.redirect('/');
//   });
// });

app.get('/auth/current_user', (req, res) => {
  res.send(req.user);
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/booking", require("./routes/booking"));

app.get("/", (req, res) => {
  res.send("HIEE");
});

app.get("/dashboard", async (req, res) => {
  const bookings = await bookingModel.find();
  res.json(bookings);
});

app.post("/api/bookings", async (req, res) => {
  try {
    console.log("Data received:", req.body);

    const { firstName, lastName, email, phone, checkIn, checkInTime, checkOut, checkOutTime } = req.body;

    const booking = await bookingModel.create({
      firstName,
      lastName,
      email,
      phone,
      checkIn: new Date(`${checkIn}T${checkInTime}`),
      checkOut: new Date(`${checkOut}T${checkOutTime}`)
    });

    res.status(201).json({ message: "Booking received successfully", booking });
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
