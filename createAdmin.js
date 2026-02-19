require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

const MONGO_URI = process.env.MONGO_URI;

// CHANGE THESE
const USERNAME = "bagichaAdmin";
const PASSWORD = "Bagicha@2026";

mongoose.connect(MONGO_URI)
.then(async () => {

  console.log("MongoDB connected");

  try {

    // check existing admin
    const existing = await Admin.findOne({ username: USERNAME });

    if (existing) {
      console.log("Admin already exists with this username");
      process.exit();
    }

    // hash password
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);

    // create admin
    await Admin.create({
      username: USERNAME,
      password: hashedPassword
    });

    console.log("✅ New admin created successfully!");
    console.log("Username:", USERNAME);
    console.log("Password:", PASSWORD);

    process.exit();

  } catch (err) {

    console.error(err);
    process.exit();

  }

})
.catch(err => {
  console.error("MongoDB connection error:", err);
});
