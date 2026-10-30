
const Item = require("../models/Item");

// CREATE: Save a new item
const createItem = async (req, res) => {
  try {
    const item = await Item.create({
  ...req.body,
  createdBy: req.user._id,
});

    res.status(201).json({
      message: "Item created successfully",
      item,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Please check the item details.",
        errors: Object.values(error.errors).map(
          (err) => err.message
        ),
      });
    }

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
    res.status(500).json({
      message: "Failed to retrieve your reports.",
    });
  }
};


// READ: Get one item by ID
const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!require("mongoose").isValidObjectId(id)) {
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
    res.status(500).json({
      message: "Failed to retrieve item.",
    });
  }
};

// UPDATE: Edit an existing item

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!require("mongoose").isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid item ID.",
      });
    }

    const item = await Item.findOneAndUpdate(
      {
        _id: id,
        createdBy: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found or you do not have permission to update it.",
      });
    }

    res.status(200).json({
      message: "Item updated successfully",
      item,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Please check the updated details.",
        errors: Object.values(error.errors).map(
          (err) => err.message
        ),
      });
    }

    res.status(500).json({
      message: "Failed to update item.",
    });
  }
};


// DELETE: Remove an item

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!require("mongoose").isValidObjectId(id)) {
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
        message: "Item not found or you do not have permission to delete it.",
      });
    }

    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
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
