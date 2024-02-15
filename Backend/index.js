require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ProductRouter = require("./routers/productRouter");

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => console.error("Connection error", error.message));

// Use Routes
app.use("/products", ProductRouter);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
