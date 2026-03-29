const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
console.log("CLIENT ID:", process.env.GOOGLE_CLIENT_ID);
console.log("CLIENT SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "loaded" : "missing");
console.log("REDIRECT URI:", process.env.GOOGLE_REDIRECT_URI);

const authRoutes = require("./routes/authRoutes");
const emailRoutes = require("./routes/emailRoutes");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/emails", emailRoutes);

app.get("/", (req, res) => {
  res.send("Smart Email Triage Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});