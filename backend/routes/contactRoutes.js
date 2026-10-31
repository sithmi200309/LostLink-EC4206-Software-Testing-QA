
const express = require("express");
const router = express.Router();

const {
  sendContactRequest,
  getReceivedRequests,
} = require("../controllers/contactController");

const protect = require("../middleware/authMiddleware");

// Send a contact request
router.post("/", protect, sendContactRequest);

// Get contact requests received by the logged-in user
router.get("/received", protect, getReceivedRequests);

module.exports = router;
