const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");


// LOGIN
router.post("/login", async (req, res) => {

  try {

    const { username, password } = req.body;

    // Check admin exists
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Check password
    const valid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Create secure JWT token
    const token = jwt.sign(

      { id: admin._id },

      process.env.JWT_SECRET,

      { expiresIn: "7d" }

    );

    res.json({
      success: true,
      token,
      username: admin.username
    });

  }
  catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

});


module.exports = router;
