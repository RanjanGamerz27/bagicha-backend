const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

mongoose.connect("mongodb://127.0.0.1:27017/bagicha");

async function createAdmin() {

  const hashed = await bcrypt.hash("admin123", 10);

  await Admin.create({
    username: "admin",
    password: hashed
  });

  console.log("Admin created");

  process.exit();

}

createAdmin();
