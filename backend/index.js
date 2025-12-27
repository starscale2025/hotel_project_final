const express = require("express");
const app = express();
require("dotenv").config();
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
const cors = require("cors");


connectDB();

const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "https://hotel-project-final-murex.vercel.app",
];

// Manual CORS middleware - MUST be FIRST, before ANY other middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Log all requests for debugging
  console.log('Request:', req.method, req.path, 'Origin:', origin);
  console.log('Allowed origins:', allowedOrigins);
  
  // Check if origin is allowed
  if (origin && allowedOrigins.includes(origin)) {
    // Set CORS headers for allowed origins
    // Use both setHeader and header to ensure compatibility
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Type, Authorization');
    
    // Also set using Express header() method
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    
    // Handle preflight OPTIONS requests
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
      res.header('Access-Control-Max-Age', '86400');
      console.log('Preflight OPTIONS request handled for origin:', origin);
      console.log('Response headers:', res.getHeaders());
      return res.status(200).end();
    }
    
    console.log('CORS headers set for origin:', origin);
    console.log('Response headers:', res.getHeaders());
  } else if (origin) {
    // Log blocked origins for debugging
    console.log('CORS blocked origin:', origin);
    console.log('Origin in allowed list?', allowedOrigins.includes(origin));
  }
  
  next();
});

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
}));

// app.options("*", cors());




app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(cookieParser());

// Admin login routes - define before other routes
app.get("/admin/login", (req, res) => {
  console.log('GET /admin/login requested');
  res.render("login");
});

app.post("/admin/login", (req, res) => {
  console.log('POST /admin/login requested');
  console.log('Request body:', req.body);
  
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

// routes
app.use("/booking", require("./routes/booking"));


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

// Test endpoint to verify CORS
app.get('/api/test-cors', (req, res) => {
  res.json({ 
    message: 'CORS test successful',
    origin: req.headers.origin,
    allowedOrigins: allowedOrigins
  });
});

// 404 handler for debugging
app.use((req, res, next) => {
  console.log('404 - Route not found:', req.method, req.path);
  res.status(404).json({ 
    error: 'Route not found',
    method: req.method,
    path: req.path,
    availableRoutes: [
      'GET /admin/login',
      'POST /admin/login',
      'POST /api/auth/google',
      'GET /dashboard',
      'GET /dashboard/rooms',
      'GET /dashboard/tables',
      'POST /api/bookings',
      'POST /api/table-booking',
      'GET /api/test-cors'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Allowed origins:', allowedOrigins);
  console.log('Available routes:');
  console.log('  GET  /admin/login');
  console.log('  POST /admin/login');
  console.log('  POST /api/auth/google');
  console.log('  GET  /dashboard');
  console.log('  GET  /dashboard/rooms');
  console.log('  GET  /dashboard/tables');
  console.log('  POST /api/bookings');
  console.log('  POST /api/table-booking');
});
