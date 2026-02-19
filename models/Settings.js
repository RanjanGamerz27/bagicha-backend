const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({

  adminName: String,

  adminEmail: String,

  adminPhone: String,

  resortName: String,

  resortAddress: String,

  updatedAt: {

    type: Date,

    default: Date.now

  }

});

module.exports =
  mongoose.model(
    "Settings",
    settingsSchema
  );
