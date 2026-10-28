
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Lost", "Found"],
      required: [true, "Please select Lost or Found."],
    },

    name: {
      type: String,
      required: [true, "Item name is required."],
      trim: true,
      minlength: [2, "Item name must contain at least 2 characters."],
      maxlength: [100, "Item name cannot exceed 100 characters."],
    },

    category: {
      type: String,
      enum: [
        "Bags",
        "Electronics",
        "Personal Items",
        "Documents",
        "Stationery",
        "Accessories",
        "Clothing",
        "Other",
      ],
      required: [true, "Please select a category."],
    },

    location: {
      type: String,
      required: [true, "Location is required."],
      trim: true,
      maxlength: [150, "Location cannot exceed 150 characters."],
    },

    date: {
      type: Date,
      required: [true, "Lost or found date is required."],
      validate: {
        validator: function (value) {
          const today = new Date();
          today.setHours(23, 59, 59, 999);
          return value <= today;
        },
        message: "The date cannot be in the future.",
      },
    },

    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
      minlength: [10, "Description must contain at least 10 characters."],
      maxlength: [1000, "Description cannot exceed 1000 characters."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);
