const mongoose = require("mongoose");
const ContactRequest = require("../models/ContactRequest");
const Item = require("../models/Item");

// @desc    Send a contact request to an item reporter
// @route   POST /api/contact
// @access  Private
const sendContactRequest = async (req, res) => {
  try {
    const { itemId, message } = req.body;

    // Validate the request message
    if (!itemId || !message || !message.trim()) {
      return res.status(400).json({
        message: "Please provide an item and a message.",
      });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({
        message: "Message must contain at least 10 characters.",
      });
    }

    
    // Reject malformed item IDs before querying the database
    if (!mongoose.isValidObjectId(itemId)) {
      return res.status(400).json({
        message: "Invalid item ID.",
      });
    }

    // Find the item being contacted about
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Item not found.",
      });
    }

    // Prevent users from contacting themselves
    if (item.createdBy.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot contact yourself about your own report.",
      });
    }

    // Prevent duplicate pending requests for the same item
    const existingRequest = await ContactRequest.findOne({
      item: itemId,
      sender: req.user._id,
      status: "Pending",
    });

    if (existingRequest) {
      return res.status(409).json({
        message: "You already have a pending request for this item.",
      });
    }

    // Create the contact request
    const contactRequest = await ContactRequest.create({
      item: item._id,
      sender: req.user._id,
      recipient: item.createdBy,
      message: message.trim(),
    });

    res.status(201).json({
      message: "Contact request sent successfully.",
      contactRequest,
    });
  } catch (error) {
    console.error("Send contact request error:", error);

    res.status(500).json({
      message: "Unable to send contact request.",
    });
  }
};

// @desc    Get contact requests received by the logged-in user
// @route   GET /api/contact/received
// @access  Private
const getReceivedRequests = async (req, res) => {
  try {
    const requests = await ContactRequest.find({
      recipient: req.user._id,
    })
      .populate("item", "name status category location")
      .populate("sender", "fullName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error("Get received requests error:", error);

    res.status(500).json({
      message: "Unable to retrieve contact requests.",
    });
  }
};

module.exports = {
  sendContactRequest,
  getReceivedRequests,
};
