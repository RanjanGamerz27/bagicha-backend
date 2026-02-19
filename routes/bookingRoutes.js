const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");


// Save booking
router.post("/", async (req, res) => {

  try {

    const booking = new Booking(req.body);

    await booking.save();

    res.json({
      success: true,
      message: "Booking saved successfully"
    });

  }
  catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});


// Get all bookings
router.get("/", async (req, res) => {

  try {

    const bookings =
      await Booking.find().sort({
        createdAt: -1
      });

    res.json(bookings);

  }
  catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});


// Delete booking
router.delete("/:id", async (req, res) => {

  try {

    const deleted =
      await Booking.findByIdAndDelete(
        req.params.id
      );

    if (!deleted) {

      return res.json({
        success: false,
        message: "Booking not found"
      });

    }

    res.json({
      success: true
    });

  }
  catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});


// ✅ UPDATE STATUS (FIXED POSITION)
router.put("/:id/status", async (req, res) => {

  try {

    const { status } = req.body;

    const updatedBooking =
      await Booking.findByIdAndUpdate(

        req.params.id,

        { status: status },

        { new: true }

      );

    if (!updatedBooking) {

      return res.json({
        success: false,
        message: "Booking not found"
      });

    }

    res.json({
      success: true,
      booking: updatedBooking
    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});


// ✅ EXPORT MUST BE LAST
module.exports = router;
