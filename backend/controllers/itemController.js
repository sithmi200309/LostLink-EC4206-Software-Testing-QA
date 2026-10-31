
const mongoose = require("mongoose");
const Item = require("../models/Item");

// Allowed fields users can create or update
const allowedItemFields = [
  "status",
  "name",
  "category",
  "location",
  "date",
  "description",
];

// Extract only permitted fields
const getAllowedFields = (body) => {
  const filteredData = {};

  allowedItemFields.forEach((field) => {
    if (body[field] !== undefined) {
      filteredData[field] = body[field];
    }
  });

  return filteredData;
};

// Handle Mongoose validation errors
const handleValidationError = (error, res, message) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      message,
      errors: Object.values(error.errors).map(
        (err) => err.message
      ),
    });
  }

  return null;
};

// CREATE: Save a new item
const createItem = async (req, res) => {
  try {
    const itemData = getAllowedFields(req.body || {});

    const item = await Item.create({
      ...itemData,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Item created successfully",
      item,
    });
  } catch (error) {
    const validationResponse = handleValidationError(
      error,
      res,
      "Please check the item details."
    );

    if (validationResponse) return validationResponse;

    console.error("Create item error:", error);

    res.status(500).json({
      message: "Failed to create item.",
    });
  }
};

// READ: Get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: items.length,
      items,
    });
  } catch (error) {
    console.error("Get items error:", error);

    res.status(500).json({
      message: "Failed to retrieve items.",
    });
  }
};

// READ: Get reports created by the logged-in user
const getMyReports = async (req, res) => {
  try {
    const items = await Item.find({
      createdBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: items.length,
      items,
    });
  } catch (error) {
    console.error("Get my reports error:", error);

    res.status(500).json({
      message: "Failed to retrieve your reports.",
    });
  }
};

// READ: Get one item by ID
const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid item ID.",
      });
    }

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found.",
      });
    }

    res.status(200).json({ item });
  } catch (error) {
    console.error("Get item error:", error);

    res.status(500).json({
      message: "Failed to retrieve item.",
    });
  }
};

// UPDATE: Edit an existing item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid item ID.",
      });
    }

    // Only allow permitted item fields to be updated
    const updateData = getAllowedFields(req.body || {});

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "Please provide valid item details to update.",
      });
    }

    const item = await Item.findOneAndUpdate(
      {
        _id: id,
        createdBy: req.user._id,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!item) {
      return res.status(404).json({
        message:
          "Item not found or you do not have permission to update it.",
      });
    }

    res.status(200).json({
      message: "Item updated successfully",
      item,
    });
  } catch (error) {
    const validationResponse = handleValidationError(
      error,
      res,
      "Please check the updated details."
    );

    if (validationResponse) return validationResponse;

    console.error("Update item error:", error);

    res.status(500).json({
      message: "Failed to update item.",
    });
  }
};

// DELETE: Remove an item
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid item ID.",
      });
    }

    const item = await Item.findOneAndDelete({
      _id: id,
      createdBy: req.user._id,
    });

    if (!item) {
      return res.status(404).json({
        message:
          "Item not found or you do not have permission to delete it.",
      });
    }

    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.error("Delete item error:", error);

    res.status(500).json({
      message: "Failed to delete item.",
    });
  }
};

module.exports = {
  createItem,
  getItems,
  getMyReports,
  getItemById,
  updateItem,
  deleteItem,
};
