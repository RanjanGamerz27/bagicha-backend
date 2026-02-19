const express = require("express");

const router = express.Router();

const Settings =
  require("../models/Settings");



/* GET Settings */
router.get("/", async (req, res) => {

  try {

    let settings =
      await Settings.findOne();

    if (!settings) {

      settings =
        await Settings.create({

          adminName: "Admin",

          adminEmail: "admin@bagicha.com",

          adminPhone: "",

          resortName: "Bagicha Resort",

          resortAddress: ""

        });

    }

    res.json(settings);

  }
  catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});



/* UPDATE Settings */
router.put("/", async (req, res) => {

  try {

    const updated =
      await Settings.findOneAndUpdate(

        {},

        req.body,

        {
          new: true,
          upsert: true
        }

      );

    res.json(updated);

  }
  catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


module.exports = router;
