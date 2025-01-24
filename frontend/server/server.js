const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/auth");
const noteRoutes = require("./src/routes/notes");
const config = require("./src/config/config");

const app = express();
const port = config.port || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", noteRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

module.exports = app;
