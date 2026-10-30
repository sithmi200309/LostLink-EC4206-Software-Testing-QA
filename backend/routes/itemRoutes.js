
const express = require("express");
const router = express.Router();

const {
  createItem,
  getItems,
  getMyReports,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

const protect = require("../middleware/authMiddleware");

// Public routes
router.get("/", getItems);

// Protected route: Get reports belonging to logged-in user
router.get("/my-reports", protect, getMyReports);

// Public route: Get one item by ID
router.get("/:id", getItemById);

// Protected routes
router.post("/", protect, createItem);
router.put("/:id", protect, updateItem);
router.delete("/:id", protect, deleteItem);

module.exports = router;
