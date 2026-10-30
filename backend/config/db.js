
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("\nMongoDB connection failed!");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code || "Not provided");

    if (error.reason?.servers) {
      console.error("\nMongoDB server details:");

      for (const [address, server] of error.reason.servers) {
        console.error({
          address,
          serverType: server.type,
          error: server.error?.message || "No server error reported",
        });
      }
    }

    process.exit(1);
  }
}

module.exports = connectDB;
