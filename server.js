require("dotenv").config();
const connectDB = require("./src/config/database");
const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./src/middlewares/errorHandler");
const authRoutes = require("./src/routes/authRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");
const serviceRoutes = require("./src/routes/serviceRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
