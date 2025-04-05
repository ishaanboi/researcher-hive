const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON request bodies

// Routes
const testRoutes = require("./routes/testRoutes");
app.use("/api/test", testRoutes);

// Root route (optional)
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${5000}`);
});

const authRoutes = require("./routes/auth");
 // Ensure case matches exactly!
app.use('/api/auth', authRoutes);
