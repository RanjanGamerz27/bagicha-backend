const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  name: String,

  phone: String,

  event: String,

  date: String,

  guests: Number,

  message: String,

  status: {
    type: String,
    default: "Pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports =
  mongoose.model("Booking", bookingSchema);
