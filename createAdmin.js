require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

// Use Atlas connection string from .env
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected for admin creation");
  createAdmin();
})
.catch(err => {
  console.error(err);
});

async function createAdmin() {

  try {

    const existing = await Admin.findOne({ username: "admin" });

    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashed = await bcrypt.hash("admin123", 10);

    await Admin.create({
      username: "admin",
      password: hashed
    });

    console.log("Admin created successfully");

    process.exit();

  } catch (err) {
    console.error(err);
    process.exit();
  }

}
