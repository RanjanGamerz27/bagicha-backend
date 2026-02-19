const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");

const SECRET = "bagicha-secret-key";


router.post("/login", async (req, res) => {

  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (!admin)
    return res.json({ success: false });


  const valid = await bcrypt.compare(
    password,
    admin.password
  );

  if (!valid)
    return res.json({ success: false });


  const token = jwt.sign(
    { id: admin._id },
    SECRET
  );


  res.json({
    success: true,
    token
  });

});

module.exports = router;

// Delete booking
router.delete("/:id", async (req, res) => {

  try {

    await Booking.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true
    });

  }
  catch {

    res.json({
      success: false
    });

  }

});
