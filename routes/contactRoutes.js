const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// Create contact message
router.post("/", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Get contact messages
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update message status
router.patch("/:id/status", async (req, res) => {
  try {
    const allowed = ["New", "Read", "Replied"];

    if (!allowed.includes(req.body.status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact status"
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found"
      });
    }

    res.json({
      success: true,
      message: "Message status updated",
      contact
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;