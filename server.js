require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


// ✅ Security middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://bagicha-frontend.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());


// ✅ Health check route (important for Render)
app.get("/", (req, res) => {
  res.send("Bagicha Backend API Running");
});


// ✅ Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));


// ✅ Use Render port
const PORT = process.env.PORT || 5000;


// ✅ MongoDB connection with production options
mongoose.connect(process.env.MONGO_URI, {

  useNewUrlParser: true,
  useUnifiedTopology: true,

})
.then(() => {

  console.log("✅ MongoDB connected");

  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });

})
.catch((err) => {

  console.error("❌ MongoDB connection error:", err);

});
