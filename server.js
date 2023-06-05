const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const recipeRoutes = require("./routes/recipeRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 5050;

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB:", err);
  });

// Routes
app.use("/recipes", recipeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
