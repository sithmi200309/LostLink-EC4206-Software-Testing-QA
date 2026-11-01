require("node:dns").setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/contact", contactRoutes);


// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to the LostLink API!");
});

// Connect to MongoDB before starting the server
async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`LostLink server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start LostLink server:", error.message);
    process.exit(1);
  }
}

startServer();