const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// 🔍 Debug logs (safe)
console.log("CLIENT ID:", process.env.GOOGLE_CLIENT_ID ? "loaded" : "missing");
console.log("CLIENT SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "loaded" : "missing");
console.log("REDIRECT URI:", process.env.GOOGLE_REDIRECT_URI);

const authRoutes = require("./routes/authRoutes");
const emailRoutes = require("./routes/emailRoutes");

const app = express();

// ✅ CORS (local + production both)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://inboxiq-frontend.onrender.com" // 👈 apna actual frontend URL daalna
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // postman etc.
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/emails", emailRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Smart Email Triage Backend Running ✅");
});

// ✅ IMPORTANT (Render compatible)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});